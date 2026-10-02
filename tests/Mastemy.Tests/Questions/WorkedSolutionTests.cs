using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Questions.Wave3QuestionsFixture;

namespace Mastemy.Tests.Questions;

public class WorkedSolutionTests(Wave3QuestionsFixture fx) : IClassFixture<Wave3QuestionsFixture>
{
    private static object Input(string ext, string? worked) => new
    {
        externalId = ext, type = QuestionType.SingleChoice, language = "en", stem = "What is 2+2?", explanation = "Basic arithmetic.",
        difficulty = Difficulty.Easy, skillCode = "MATH.ADD", certificationObjective = "", tags = new[] { "math" }, sourceReference = "original",
        allowShuffle = true,
        options = new[] { new { text = "4", isCorrect = true, rationale = "Correct." }, new { text = "5", isCorrect = false, rationale = "Off by one." } },
        workedSolution = worked,
    };

    [Fact]
    public async Task Worked_solution_is_validated_like_rationales_and_versioned_with_the_question()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);

        // Same rich-text rules as explanations/rationales: no raw HTML, no headings, no foreign images, length cap.
        foreach (var bad in new[] { "<script>alert(1)</script>", "# Heading", $"![x](resource:{Guid.NewGuid()})", new string('a', WorkedSolutions.MaxLength + 1) })
            Assert.Equal(HttpStatusCode.BadRequest,
                (await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("W-" + Guid.NewGuid().ToString("N")[..6], bad)))).StatusCode);

        var created = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions",
            JsonBody(Input("W-1", "Step 1: $2+2$\r\nStep 2: answer is **4**."))));
        Assert.Equal("Step 1: $2+2$\nStep 2: answer is **4**.", created.Version.WorkedSolution);

        // Optional: a question without one is fine and has none.
        var plain = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("W-2", null))));
        Assert.Null(plain.Version.WorkedSolution);

        // Draft edit in place updates it; blank removes it.
        var edited = await Read<QuestionDto>(await author.PutAsync($"/api/studio/questions/{created.Id}", JsonBody(Input("W-1", "New steps."))));
        Assert.Equal("New steps.", edited.Version.WorkedSolution);
        var cleared = await Read<QuestionDto>(await author.PutAsync($"/api/studio/questions/{created.Id}", JsonBody(Input("W-1", "  "))));
        Assert.Null(cleared.Version.WorkedSolution);

        // Live questions stage edits: the pending version carries its own worked solution, the served one is unchanged.
        await fx.WithDb(async db => { var q = await db.Questions.FirstAsync(x => x.Id == plain.Id); q.State = QuestionState.Active; await db.SaveChangesAsync(); });
        var staged = await Read<QuestionDto>(await author.PutAsync($"/api/studio/questions/{plain.Id}", JsonBody(Input("W-2", "Staged steps."))));
        Assert.Null(staged.Version.WorkedSolution);
        Assert.Equal("Staged steps.", staged.Pending!.WorkedSolution);
        var detail = await Read<QuestionDetailDto>(await author.GetAsync($"/api/studio/questions/{plain.Id}"));
        Assert.Equal("Staged steps.", detail.Question.Pending!.WorkedSolution);
    }
}
