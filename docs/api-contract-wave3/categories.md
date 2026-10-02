# Category administration (Staff)

Service/controller: `src/Mastemy.Api/Modules/Catalog/CategoryAdmin.cs`. Uses the existing `Categories` table (no schema change).
All endpoints require the `Staff` policy (Admin/SuperAdmin); others get 403. Every change is audited
(`category.created`, `category.updated`, `category.deleted`). The public list stays at `GET /api/categories`.

`CategoryAdminDto { id, slug, nameEn, nameAr, parentId, isAcademy, sortOrder, courseCount, childCount }`

`CategoryAdminInput { slug, nameEn, nameAr, parentId|null, isAcademy, sortOrder }`

| Method | Path | Result |
|---|---|---|
| GET | `/api/admin/categories` | All categories (ordered by parent, sort order, English name) with course/child counts. |
| GET | `/api/admin/categories/{id}` | One category; 404 if missing. |
| POST | `/api/admin/categories` | 201 + dto. |
| PUT | `/api/admin/categories/{id}` | Full update (slug, names, parent, academy flag, sort order). |
| DELETE | `/api/admin/categories/{id}` | 204. |

Validation and conflicts:

- `slug`: 1–100 lowercase letters, digits, hyphens (`invalid_slug`); unique (`409 slug_taken`).
- `nameEn` / `nameAr`: 1–100 characters, plain text (`invalid_name`).
- `sortOrder`: −100000…100000.
- `parentId` must exist (`invalid_parent`); a category cannot be moved under itself or any of its descendants (`category_cycle`);
  the tree is at most 4 levels deep (`category_too_deep`).
- Delete returns **409** when the category still has courses — current `CourseCategories` rows or published snapshot versions that
  reference it (`category_has_courses`) — has subcategories (`category_has_children`), owns Taxonomy pathways (`category_has_pathways`),
  or is referenced by Commerce subscription plans, Commerce bundles or Taxonomy collections (`category_in_use`).
