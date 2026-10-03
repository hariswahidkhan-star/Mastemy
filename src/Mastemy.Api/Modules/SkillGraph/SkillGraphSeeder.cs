using Mastemy.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.SkillGraph;

public static class SkillGraphSeeder
{
    /// <summary>Seeds ~20 skill nodes with prerequisite edges for a Web Development learning path.</summary>
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Set<SkillNode>().AnyAsync()) return; // already seeded

        var skills = new (string Code, string Name, string Desc, string Cat)[]
        {
            ("html-fundamentals", "HTML Fundamentals", "Semantic markup, document structure, forms and accessibility", "web-dev"),
            ("css-basics", "CSS Basics", "Selectors, box model, layout fundamentals, responsive design", "web-dev"),
            ("css-layout", "CSS Layout", "Flexbox, Grid, positioning, and modern layout techniques", "web-dev"),
            ("css-animations", "CSS Animations", "Transitions, keyframe animations, transforms", "web-dev"),
            ("js-fundamentals", "JavaScript Fundamentals", "Variables, types, operators, control flow, functions", "web-dev"),
            ("js-dom", "DOM Manipulation", "Selecting, creating, modifying DOM elements and events", "web-dev"),
            ("js-async", "Async JavaScript", "Promises, async/await, fetch API, error handling", "web-dev"),
            ("js-modules", "JavaScript Modules", "ES modules, import/export, bundling concepts", "web-dev"),
            ("ts-basics", "TypeScript Basics", "Types, interfaces, generics, type narrowing", "web-dev"),
            ("react-fundamentals", "React Fundamentals", "Components, JSX, props, rendering, virtual DOM", "web-dev"),
            ("react-state", "React State Management", "useState, useReducer, lifting state, context", "web-dev"),
            ("react-hooks", "React Hooks", "useEffect, useMemo, useCallback, custom hooks", "web-dev"),
            ("react-routing", "React Routing", "Client-side routing, nested routes, navigation", "web-dev"),
            ("react-forms", "React Forms", "Controlled components, validation, form libraries", "web-dev"),
            ("react-patterns", "Advanced React Patterns", "Compound components, render props, HOCs, portals", "web-dev"),
            ("api-design", "REST API Design", "HTTP methods, status codes, resource design, authentication", "web-dev"),
            ("testing-basics", "Testing Fundamentals", "Unit testing, integration testing, mocking, TDD", "web-dev"),
            ("git-basics", "Git & Version Control", "Commits, branches, merging, pull requests", "tooling"),
            ("a11y", "Web Accessibility", "ARIA, keyboard navigation, screen readers, WCAG", "web-dev"),
            ("perf-optimization", "Performance Optimization", "Core Web Vitals, lazy loading, code splitting, caching", "web-dev"),
        };

        var nodes = new Dictionary<string, SkillNode>();
        foreach (var (code, name, desc, cat) in skills)
        {
            var node = new SkillNode { Code = code, Name = name, Description = desc, CategoryCode = cat, CreatedUtc = DateTime.UtcNow };
            db.Set<SkillNode>().Add(node);
            nodes[code] = node;
        }
        await db.SaveChangesAsync();

        // Prerequisite edges: (prerequisite -> dependent)
        var edges = new (string From, string To)[]
        {
            ("html-fundamentals", "css-basics"),
            ("css-basics", "css-layout"),
            ("css-basics", "css-animations"),
            ("html-fundamentals", "a11y"),
            ("css-basics", "a11y"),
            ("html-fundamentals", "js-fundamentals"),
            ("js-fundamentals", "js-dom"),
            ("js-fundamentals", "js-async"),
            ("js-fundamentals", "js-modules"),
            ("js-fundamentals", "ts-basics"),
            ("js-dom", "react-fundamentals"),
            ("js-modules", "react-fundamentals"),
            ("css-layout", "react-fundamentals"),
            ("react-fundamentals", "react-state"),
            ("react-fundamentals", "react-hooks"),
            ("react-fundamentals", "react-routing"),
            ("react-state", "react-forms"),
            ("react-hooks", "react-forms"),
            ("react-hooks", "react-patterns"),
            ("react-state", "react-patterns"),
            ("js-async", "api-design"),
            ("js-fundamentals", "testing-basics"),
            ("react-hooks", "perf-optimization"),
            ("css-layout", "perf-optimization"),
        };

        foreach (var (from, to) in edges)
        {
            db.Set<SkillEdge>().Add(new SkillEdge
            {
                FromSkillId = nodes[from].Id,
                ToSkillId = nodes[to].Id,
            });
        }
        await db.SaveChangesAsync();
    }
}
