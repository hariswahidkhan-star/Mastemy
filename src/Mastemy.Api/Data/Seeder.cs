using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Data;

public static class Seeder
{
    // Spec §5: the original fourteen domains plus cross-cutting academies.
    private static readonly (string slug, string en, string ar, bool academy)[] Categories =
    [
        ("technology-programming", "Technology & Programming", "التكنولوجيا والبرمجة", false),
        ("business-entrepreneurship", "Business & Entrepreneurship", "الأعمال وريادة الأعمال", false),
        ("finance-accounting", "Finance & Accounting", "المالية والمحاسبة", false),
        ("project-management-certifications", "Project Management & Certifications", "إدارة المشاريع والشهادات", false),
        ("marketing-sales", "Marketing & Sales", "التسويق والمبيعات", false),
        ("design-creative", "Design & Creative", "التصميم والإبداع", false),
        ("personal-development", "Personal Development", "التطوير الشخصي", false),
        ("health-wellness", "Health & Wellness", "الصحة والعافية", false),
        ("language-learning", "Language Learning", "تعلم اللغات", false),
        ("engineering-architecture", "Engineering & Architecture", "الهندسة والعمارة", false),
        ("legal-compliance", "Legal & Compliance", "القانون والامتثال", false),
        ("education-teaching", "Education & Teaching", "التعليم والتدريس", false),
        ("media-journalism", "Media & Journalism", "الإعلام والصحافة", false),
        ("science-mathematics", "Science & Mathematics", "العلوم والرياضيات", false),
        ("ai-academy", "AI Academy", "أكاديمية الذكاء الاصطناعي", true),
        ("data-analytics", "Data & Analytics", "البيانات والتحليلات", true),
        ("cloud", "Cloud", "الحوسبة السحابية", true),
        ("cybersecurity", "Cybersecurity", "الأمن السيبراني", true),
        ("hr", "Human Resources", "الموارد البشرية", true),
        ("supply-chain", "Supply Chain", "سلاسل الإمداد", true),
        ("quality", "Quality", "الجودة", true),
        ("sustainability", "Sustainability", "الاستدامة", true),
    ];

    public static async Task SeedAsync(AppDbContext db, IConfiguration cfg, ILogger log, bool allowAccountSeed = true)
    {
        var existing = await db.Categories.Select(c => c.Slug).ToListAsync();
        var order = 0;
        foreach (var (slug, en, ar, academy) in Categories)
        {
            order++;
            if (existing.Contains(slug)) continue;
            db.Categories.Add(new Category { Slug = slug, NameEn = en, NameAr = ar, IsAcademy = academy, SortOrder = order });
        }

        var email = cfg["Seed:SuperAdminEmail"];
        var pw = cfg["Seed:SuperAdminPassword"];
        // Account seeding runs only in Development or with an explicit one-off Seed:AllowSuperAdminBootstrap.
        if (allowAccountSeed && !string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(pw))
        {
            var norm = email.Trim().ToUpperInvariant();
            if (!await db.Users.AnyAsync(u => u.NormalizedEmail == norm))
            {
                var u = new User { Email = email.Trim(), NormalizedEmail = norm, DisplayName = "Mastemy Admin", PasswordHash = PasswordHasher.Hash(pw) };
                foreach (var r in new[] { Roles.SuperAdmin, Roles.Admin, Roles.Instructor, Roles.Reviewer, Roles.Student })
                    u.Roles.Add(new UserRole { UserId = u.Id, Role = r });
                db.Users.Add(u);
                log.LogInformation("Seeded SuperAdmin account {Email}", Mastemy.Api.Infrastructure.LogRedaction.MaskEmail(email));
            }
        }
        await db.SaveChangesAsync();
    }
}
