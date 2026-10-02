using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Mastemy.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_Chunks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SnapshotVersion = table.Column<int>(type: "int", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonTitle = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Section = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    SourceKind = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    IsPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    StartSeconds = table.Column<int>(type: "int", nullable: true),
                    Ordinal = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    TokenEstimate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_Chunks", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_Conversations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    MessageCount = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastMessageAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_Conversations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_GeneratedQuestions",
                columns: table => new
                {
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Model = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    RequestedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_GeneratedQuestions", x => x.QuestionId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_IndexStates",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SnapshotVersion = table.Column<int>(type: "int", nullable: false),
                    ChunkCount = table.Column<int>(type: "int", nullable: false),
                    IndexedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_IndexStates", x => x.CourseId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_PracticeSets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    PayloadJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Model = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_PracticeSets", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_Usage",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Feature = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Model = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    InputTokens = table.Column<int>(type: "int", nullable: false),
                    OutputTokens = table.Column<int>(type: "int", nullable: false),
                    CacheReadTokens = table.Column<int>(type: "int", nullable: false),
                    CacheWriteTokens = table.Column<int>(type: "int", nullable: false),
                    CostEstimate = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: false),
                    Period = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_Usage", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Analytics_Events",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: true),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    AnonId = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    OccurredAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReceivedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analytics_Events", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CertificateTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    TitleText = table.Column<string>(type: "varchar(120)", maxLength: 120, nullable: false),
                    PrimaryColor = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: false),
                    AccentColor = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: false),
                    LogoResourceId = table.Column<Guid>(type: "char(36)", nullable: true),
                    SignatureName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    SignatureTitle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Archived = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CertificateTemplates", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ActorId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Action = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    EntityType = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    EntityId = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    Details = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_AgreementVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Version = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_AgreementVersions", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_CourseTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    StructureJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ChecklistJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_CourseTemplates", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Slug = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    NameEn = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    NameAr = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsAcademy = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Certificates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    RecipientName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CourseTitle = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    AssessmentCriteria = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ScorePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    RevocationReason = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    PubliclyVisible = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IssuedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificates", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Affiliates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    NormalizedCode = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    CommissionPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    AttributionWindowDays = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Affiliates", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Bundles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Bundles", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_ConsumptionEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    RefId = table.Column<Guid>(type: "char(36)", nullable: true),
                    OccurredAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_ConsumptionEvents", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Coupons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    NormalizedCode = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    PercentOff = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    AmountOff = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: true),
                    Scope = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    ScopeId = table.Column<Guid>(type: "char(36)", nullable: true),
                    MaxRedemptions = table.Column<int>(type: "int", nullable: true),
                    MaxPerUser = table.Column<int>(type: "int", nullable: false),
                    StartsAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    MinAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    AllowedEmails = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    AllowedDomains = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    AllowedOrganizationId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Status = table.Column<string>(type: "varchar(24)", maxLength: 24, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedByStaff = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ApprovedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Coupons", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_InvoiceCounters",
                columns: table => new
                {
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Next = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_InvoiceCounters", x => new { x.Kind, x.Year });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PayoutRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    InstructorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    PayoutBatchId = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Notes = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PayoutRequests", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Plans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Scope = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Interval = table.Column<string>(type: "varchar(8)", maxLength: 8, nullable: false),
                    AiAllowance = table.Column<int>(type: "int", nullable: false),
                    IncludedServices = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Plans", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PoolAllocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Revenue = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    PoolPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Pool = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    TotalUnits = table.Column<long>(type: "bigint", nullable: false),
                    Allocated = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PoolAllocations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Promotions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    PercentOff = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    StartsAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndsAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Promotions", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_TaxRates",
                columns: table => new
                {
                    Country = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false),
                    RatePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_TaxRates", x => x.Country);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommissionLedger",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    InstructorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    GrossAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    InstructorAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    PlatformAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    PayoutBatchId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommissionLedger", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CourseReviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    VerifiedPurchase = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    InstructorReply = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    Hidden = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseReviews", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmailOutbox",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ToAddress = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Subject = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Attempts = table.Column<int>(type: "int", nullable: false),
                    LastError = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    NextAttemptAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailOutbox", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Engagement_ModerationNotes",
                columns: table => new
                {
                    TargetType = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    TargetId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: false),
                    HiddenAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Engagement_ModerationNotes", x => new { x.TargetType, x.TargetId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SeatRequestId = table.Column<Guid>(type: "char(36)", nullable: true),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    InvoiceId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PaidMarkedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    PaidAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    PaymentReference = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    SeatLimitBefore = table.Column<int>(type: "int", nullable: true),
                    SeatLimitAfter = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_Orders", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_OrgMaterials",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Department = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    FileName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ContentType = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    SizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    Sha256 = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    StorageKey = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    ScanVerdict = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    ScanEngine = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    UploadedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_OrgMaterials", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_PathwayAssignmentCourses",
                columns: table => new
                {
                    PathwayAssignmentId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationAssignmentId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_PathwayAssignmentCourses", x => new { x.PathwayAssignmentId, x.OrganizationAssignmentId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_PathwayAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PathwayId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Department = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    GrantsPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DueAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    AssignedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_PathwayAssignments", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_SeatRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false),
                    RequestedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecisionNote = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_SeatRequests", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_SsoConfigs",
                columns: table => new
                {
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Issuer = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    ClientId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ClientSecretProtected = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    AllowedDomains = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_SsoConfigs", x => x.OrganizationId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_SsoDomains",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Domain = table.Column<string>(type: "varchar(253)", maxLength: 253, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    VerificationToken = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    VerifiedVia = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecisionNote = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true),
                    LastDnsCheckAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_SsoDomains", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_SsoIdentities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Issuer = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    Subject = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    IssuerHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_SsoIdentities", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enterprise_SsoLoginStates",
                columns: table => new
                {
                    StateHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Nonce = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    CodeVerifierProtected = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ReturnPath = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ConsumedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HandoffHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: true),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    HandoffExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HandoffUsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    BinderHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    HandoffBinderHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: true),
                    LinkUserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprise_SsoLoginStates", x => x.StateHash);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Entitlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: true),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: true),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Source = table.Column<int>(type: "int", nullable: false),
                    StartsAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndsAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entitlements", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ImportBatches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    IdempotencyKey = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    PayloadJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    RowCount = table.Column<int>(type: "int", nullable: false),
                    ErrorCount = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportBatches", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstructorInvitations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CodeHash = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstructorInvitations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LessonProgress",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PositionSeconds = table.Column<int>(type: "int", nullable: false),
                    Completed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonProgress", x => new { x.UserId, x.LessonId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_AutoMessageDeliveries",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    MessageId = table.Column<Guid>(type: "char(36)", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_AutoMessageDeliveries", x => new { x.UserId, x.CourseId, x.Kind });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_Blocks",
                columns: table => new
                {
                    BlockerId = table.Column<Guid>(type: "char(36)", nullable: false),
                    BlockedId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_Blocks", x => new { x.BlockerId, x.BlockedId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_Conversations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LearnerId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastMessageAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_Conversations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_CourseAutoMessages",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EnabledSince = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_CourseAutoMessages", x => new { x.CourseId, x.Kind });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_ReadMarkers",
                columns: table => new
                {
                    ConversationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LastReadAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_ReadMarkers", x => new { x.ConversationId, x.UserId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_Reports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    MessageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ReporterId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ComplaintId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_Reports", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_WorkerState",
                columns: table => new
                {
                    Key = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    LastRunAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_WorkerState", x => x.Key);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NotificationPreferences",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    InApp = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Email = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationPreferences", x => new { x.UserId, x.Kind });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Link = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ReadAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OAuthNonces",
                columns: table => new
                {
                    Nonce = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ConsumedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OAuthNonces", x => x.Nonce);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Operations_BrokenLinkNotices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    VideoAssetId = table.Column<Guid>(type: "char(36)", nullable: false),
                    NotifiedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    Recipients = table.Column<int>(type: "int", nullable: false),
                    NotifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations_BrokenLinkNotices", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ProviderSessionId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    IdempotencyKey = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PaidAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Slug = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    SeatLimit = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PayoutBatches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    ApprovedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayoutBatches", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PlatformSettings",
                columns: table => new
                {
                    Key = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Value = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlatformSettings", x => x.Key);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProcessedWebhookEvents",
                columns: table => new
                {
                    EventId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Type = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedWebhookEvents", x => x.EventId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_BestsellerStats",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    DistinctBuyers = table.Column<int>(type: "int", nullable: false),
                    NetRevenue = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Eligible = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    WindowStart = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ComputedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_BestsellerStats", x => x.CourseId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CertificationIssuers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    WebsiteUrl = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    Country = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CertificationIssuers", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CertificationObjectives",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CertificationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Title = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    WeightPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CertificationObjectives", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_Certifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    IssuerId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Slug = table.Column<string>(type: "varchar(160)", maxLength: 160, nullable: false),
                    Title = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    Jurisdiction = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    ExamCode = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    LevelOrPart = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Version = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    EffectiveFrom = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    EffectiveTo = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Prerequisites = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    OfficialSourceUrl = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false),
                    LastCheckedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    EvidenceNotes = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    RenewalInfo = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    RightsNotes = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Kind = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    State = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    HasNonMcqTasks = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NonMcqDisclosure = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ReplacedById = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReviewerId = table.Column<Guid>(type: "char(36)", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastEditedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    StaleFlaggedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_Certifications", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CollectionCourses",
                columns: table => new
                {
                    CollectionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CollectionCourses", x => new { x.CollectionId, x.CourseId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_Collections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Slug = table.Column<string>(type: "varchar(160)", maxLength: 160, nullable: false),
                    TitleEn = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    TitleAr = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    Kind = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    ActiveFrom = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ActiveTo = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_Collections", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CourseCertifications",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CertificationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CourseCertifications", x => new { x.CourseId, x.CertificationId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CourseIdeas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    Audience = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Rationale = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    DemandEvidence = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Group = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    State = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    OwnerId = table.Column<Guid>(type: "char(36)", nullable: true),
                    UpdateOwnerId = table.Column<Guid>(type: "char(36)", nullable: true),
                    LinkedCourseId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CertificationIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    MaintenanceCostNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PriorityScore = table.Column<int>(type: "int", nullable: false),
                    RoadmapRank = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CourseIdeas", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_CourseSkills",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SkillId = table.Column<int>(type: "int", nullable: false),
                    AddedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    RemovedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    AddedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    RemovedBy = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_CourseSkills", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_ObjectiveLessons",
                columns: table => new
                {
                    ObjectiveId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_ObjectiveLessons", x => new { x.ObjectiveId, x.LessonId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_ObjectiveQuestions",
                columns: table => new
                {
                    ObjectiveId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_ObjectiveQuestions", x => new { x.ObjectiveId, x.QuestionId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_PathwayCourses",
                columns: table => new
                {
                    PathwayId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_PathwayCourses", x => new { x.PathwayId, x.CourseId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_Pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Slug = table.Column<string>(type: "varchar(160)", maxLength: 160, nullable: false),
                    TitleEn = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    TitleAr = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    DescriptionEn = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    DescriptionAr = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    IsPublished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_Pathways", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_PathwaySkills",
                columns: table => new
                {
                    PathwayId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SkillId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_PathwaySkills", x => new { x.PathwayId, x.SkillId });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Taxonomy_Skills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    NameEn = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy_Skills", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Trust_Complaints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Type = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    TargetType = table.Column<string>(type: "varchar(24)", maxLength: 24, nullable: false),
                    TargetId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ReporterUserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReporterEmail = table.Column<string>(type: "varchar(254)", maxLength: 254, nullable: false),
                    ReporterName = table.Column<string>(type: "varchar(120)", maxLength: 120, nullable: false),
                    Evidence = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Action = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    ResolutionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    ResolvedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    ResolvedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trust_Complaints", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Trust_ContentHolds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    TargetType = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    TargetId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ComplaintId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReleasedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReleasedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trust_ContentHolds", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Trust_InstructorSuspensions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    HadInstructorRole = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HoldBatchId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SuspendedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    SuspendedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReinstatedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReinstatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ReinstateNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trust_InstructorSuspensions", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Trust_ModerationAppeals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    TargetType = table.Column<string>(type: "varchar(24)", maxLength: 24, nullable: false),
                    TargetId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AppellantId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecisionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trust_ModerationAppeals", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    NormalizedEmail = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    PasswordHash = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    DisplayName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    PreferredLanguage = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    IsSuspended = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FailedLoginCount = table.Column<int>(type: "int", nullable: false),
                    LockoutUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "YouTubeChannels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ChannelId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Mode = table.Column<int>(type: "int", nullable: false),
                    OwnerUserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EncryptedRefreshToken = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    GrantedScopes = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    AuthorizedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YouTubeChannels", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Ai_Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ConversationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Role = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Content = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CitationsJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Grounded = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Outcome = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ai_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ai_Messages_Ai_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Ai_Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CertificateAppeals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CertificateId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecisionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CertificateAppeals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_CertificateAppeals_Certificates_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Certificates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CertificateCorrections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CertificateId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CurrentName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    RequestedName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecisionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CertificateCorrections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_CertificateCorrections_Certificates_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Certificates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CertificateFlags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CertificateId = table.Column<Guid>(type: "char(36)", nullable: false),
                    RegradeId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecisionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CertificateFlags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_CertificateFlags_Certificates_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Certificates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_AffiliateClicks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AffiliateId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_AffiliateClicks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_AffiliateClicks_Commerce_Affiliates_AffiliateId",
                        column: x => x.AffiliateId,
                        principalTable: "Commerce_Affiliates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_CouponGiftPolicies",
                columns: table => new
                {
                    CouponId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AllowsGifts = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SetBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    SetAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_CouponGiftPolicies", x => x.CouponId);
                    table.ForeignKey(
                        name: "FK_Commerce_CouponGiftPolicies_Commerce_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Commerce_Coupons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_CouponRedemptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CouponId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_CouponRedemptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_CouponRedemptions_Commerce_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Commerce_Coupons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PayoutRequestEntries",
                columns: table => new
                {
                    LedgerEntryId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PayoutRequestId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PayoutRequestEntries", x => x.LedgerEntryId);
                    table.ForeignKey(
                        name: "FK_Commerce_PayoutRequestEntries_Commerce_PayoutRequests_Payout~",
                        column: x => x.PayoutRequestId,
                        principalTable: "Commerce_PayoutRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PlanId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    IdempotencyKey = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false),
                    ProviderSessionId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    ProviderSubscriptionId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    ProviderCustomerId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    CurrentPeriodStart = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CurrentPeriodEnd = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CancelAtPeriodEnd = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    GraceUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_Subscriptions_Commerce_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Commerce_Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PoolAllocationLines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AllocationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Units = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PoolAllocationLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_PoolAllocationLines_Commerce_PoolAllocations_Alloca~",
                        column: x => x.AllocationId,
                        principalTable: "Commerce_PoolAllocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_LedgerSources",
                columns: table => new
                {
                    LedgerEntryId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: true),
                    SourceType = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    SourceId = table.Column<Guid>(type: "char(36)", nullable: false),
                    RelatedEntryId = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_LedgerSources", x => x.LedgerEntryId);
                    table.ForeignKey(
                        name: "FK_Commerce_LedgerSources_CommissionLedger_LedgerEntryId",
                        column: x => x.LedgerEntryId,
                        principalTable: "CommissionLedger",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_SubscriptionEntitlements",
                columns: table => new
                {
                    EntitlementId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SubscriptionId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_SubscriptionEntitlements", x => x.EntitlementId);
                    table.ForeignKey(
                        name: "FK_Commerce_SubscriptionEntitlements_Entitlements_EntitlementId",
                        column: x => x.EntitlementId,
                        principalTable: "Entitlements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions_ImportJobs",
                columns: table => new
                {
                    BatchId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Error = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    Created = table.Column<int>(type: "int", nullable: false),
                    Updated = table.Column<int>(type: "int", nullable: false),
                    QueuedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FinishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_ImportJobs", x => x.BatchId);
                    table.ForeignKey(
                        name: "FK_Questions_ImportJobs_ImportBatches_BatchId",
                        column: x => x.BatchId,
                        principalTable: "ImportBatches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messaging_Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ConversationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SenderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    HiddenAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HiddenBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    HiddenReason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messaging_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messaging_Messages_Messaging_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Messaging_Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Disputes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ProviderDisputeId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Reason = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ClosedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Disputes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_Disputes_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_GiftCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CodeHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    CodeCipher = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    RecipientEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    RedeemedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    RedeemedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RevealedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_GiftCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_GiftCodes_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_Invoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Number = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    Kind = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Sequence = table.Column<long>(type: "bigint", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    RefundId = table.Column<Guid>(type: "char(36)", nullable: true),
                    RelatedInvoiceId = table.Column<Guid>(type: "char(36)", nullable: true),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    BuyerName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    BuyerEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    BuyerCountry = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    TaxRatePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    TaxMode = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    LinesJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    IssuedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_Invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_Invoices_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_OrderDetails",
                columns: table => new
                {
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    Fingerprint = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ListAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    PriceSource = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    CouponId = table.Column<Guid>(type: "char(36)", nullable: true),
                    PromotionId = table.Column<Guid>(type: "char(36)", nullable: true),
                    BundleId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReferralCodeId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReferrerInstructorId = table.Column<Guid>(type: "char(36)", nullable: true),
                    AffiliateId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Country = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    BillingName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    RefundedAmount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    DisputeStatus = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: true),
                    GiftRecipientEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    GiftMessage = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    SubscriptionId = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_OrderDetails", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Commerce_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Provider = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ProviderPaymentId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Refunds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Reason = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    RequestedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ProviderRefundId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refunds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Refunds_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrganizationInvitations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    NormalizedEmail = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Department = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    InvitedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AcceptedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationInvitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationInvitations_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Account_LearningGoals",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Goals = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    SkillsOfInterest = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    LearningLanguage = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account_LearningGoals", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Account_LearningGoals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Account_Profiles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Headline = table.Column<string>(type: "varchar(160)", maxLength: 160, nullable: false),
                    Bio = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    TimeZone = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    LinksJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PublicInstructorProfile = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account_Profiles", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Account_Profiles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Account_UserSkills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Kind = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Issuer = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    CredentialUrl = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    ObtainedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account_UserSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Account_UserSkills_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Analytics_Consents",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Analytics = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analytics_Consents", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Analytics_Consents_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_Accommodations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AssessmentId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ExtraTimePercent = table.Column<int>(type: "int", nullable: false),
                    Untimed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Reason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    GrantedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RevokedBy = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_Accommodations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_Accommodations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_PracticeSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    FiltersJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ScoringPolicy = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FinishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_PracticeSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_PracticeSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_AgreementAcceptances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AgreementVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AcceptedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_AgreementAcceptances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Authoring_AgreementAcceptances_Authoring_AgreementVersions_A~",
                        column: x => x.AgreementVersionId,
                        principalTable: "Authoring_AgreementVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Authoring_AgreementAcceptances_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PayoutProfiles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LegalName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Country = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false),
                    Method = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    DestinationCipher = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    DestinationMasked = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    TaxFormStatus = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PayoutProfiles", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Commerce_PayoutProfiles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_AuthSessions",
                columns: table => new
                {
                    FamilyId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    MfaAuthenticated = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UserAgent = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    IpAddress = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    LastIpAddress = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_AuthSessions", x => x.FamilyId);
                    table.ForeignKey(
                        name: "FK_Identity_AuthSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_MfaChallenges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FailedAttempts = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_MfaChallenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Identity_MfaChallenges_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_MfaRecoveryCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CodeHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    UsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_MfaRecoveryCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Identity_MfaRecoveryCodes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_MfaResets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ActorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReenrolledAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_MfaResets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Identity_MfaResets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_OneTimeTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Purpose = table.Column<int>(type: "int", nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Email = table.Column<string>(type: "varchar(254)", maxLength: 254, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_OneTimeTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Identity_OneTimeTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Identity_UserSecurity",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    EmailVerifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    VerifiedEmail = table.Column<string>(type: "varchar(254)", maxLength: 254, nullable: true),
                    MfaSecretProtected = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    MfaEnabledAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    MfaPendingSecretProtected = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    MfaPendingCreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    MfaLastUsedStep = table.Column<long>(type: "bigint", nullable: true),
                    PasswordChangedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identity_UserSecurity", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Identity_UserSecurity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstructorApplications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Headline = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Bio = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ExpertiseEvidence = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    TestVideoUrl = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    TestVideoId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    AgreementAccepted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AgreementVersion = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ReviewerNotes = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    ReviewedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReviewedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstructorApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstructorApplications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrganizationMembers",
                columns: table => new
                {
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Department = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationMembers", x => new { x.OrganizationId, x.UserId });
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    FamilyId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ReplacedById = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_Bookmarks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TimestampSeconds = table.Column<int>(type: "int", nullable: false),
                    Label = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    LessonTitleSnapshot = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CourseTitleSnapshot = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_Bookmarks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyTools_Bookmarks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_CalendarTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_CalendarTokens", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_StudyTools_CalendarTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_Folders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_Folders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyTools_Folders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_Plans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TargetDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WeeklyMinutes = table.Column<int>(type: "int", nullable: false),
                    SessionDaysMask = table.Column<int>(type: "int", nullable: false),
                    SessionHour = table.Column<int>(type: "int", nullable: false),
                    TimeZone = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    RemindersEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FitsBeforeTarget = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_Plans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyTools_Plans_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Role = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.Role });
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Slug = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Subtitle = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Description = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Audience = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Prerequisites = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Outcomes = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Language = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    OwnerId = table.Column<Guid>(type: "char(36)", nullable: false),
                    YouTubeChannelId = table.Column<Guid>(type: "char(36)", nullable: true),
                    PromoVideoId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    PublishedVersion = table.Column<int>(type: "int", nullable: false),
                    CredentialType = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    PassThresholdPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ReviewedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Courses_YouTubeChannels_YouTubeChannelId",
                        column: x => x.YouTubeChannelId,
                        principalTable: "YouTubeChannels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UploadSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ChannelId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Description = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PrivacyStatus = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    NotifySubscribers = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SyntheticMediaDisclosed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FileName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    FileFingerprint = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    UpstreamSessionUri = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    ConfirmedOffset = table.Column<long>(type: "bigint", nullable: false),
                    LockToken = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    LockedUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ResultVideoId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    FailureReason = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    ApprovedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UploadSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UploadSessions_YouTubeChannels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "YouTubeChannels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "VideoAssets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    YouTubeVideoId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ChannelId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ObservedChannelId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    DurationSeconds = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StatusReason = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    PrivacyStatus = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    Embeddable = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    UploaderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    VideoOwnerUserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    RightsDeclared = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    RightsDeclarationText = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    MetadataEnteredManually = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LastCheckedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoAssets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoAssets_YouTubeChannels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "YouTubeChannels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_SubscriptionInvoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    SubscriptionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ProviderInvoiceId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    PeriodStart = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    PeriodEnd = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    PaidAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_SubscriptionInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_SubscriptionInvoices_Commerce_Subscriptions_Subscri~",
                        column: x => x.SubscriptionId,
                        principalTable: "Commerce_Subscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Commerce_SubscriptionInvoices_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_InvoiceSellerSnapshots",
                columns: table => new
                {
                    InvoiceId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Address = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    TaxId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    CapturedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_InvoiceSellerSnapshots", x => x.InvoiceId);
                    table.ForeignKey(
                        name: "FK_Commerce_InvoiceSellerSnapshots_Commerce_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Commerce_Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_PlanItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    PlanId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseTitle = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    LessonTitle = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    DurationSeconds = table.Column<int>(type: "int", nullable: false),
                    WeekStart = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    ReminderSentAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_PlanItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyTools_PlanItems_StudyTools_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "StudyTools_Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AuthorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announcements_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CompletionAwards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SnapshotVersion = table.Column<int>(type: "int", nullable: false),
                    LessonCount = table.Column<int>(type: "int", nullable: false),
                    RecipientName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    CourseTitle = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    RevocationReason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    PubliclyVisible = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IssuedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CompletionAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_CompletionAwards_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assessment_CompletionAwards_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CompletionAwardSettings",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CompletionAwardSettings", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Assessment_CompletionAwardSettings_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_CourseCertificateSettings",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TemplateId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_CourseCertificateSettings", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Assessment_CourseCertificateSettings_Assessment_CertificateT~",
                        column: x => x.TemplateId,
                        principalTable: "Assessment_CertificateTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assessment_CourseCertificateSettings_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ModuleId = table.Column<Guid>(type: "char(36)", nullable: true),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Kind = table.Column<int>(type: "int", nullable: false),
                    Mode = table.Column<int>(type: "int", nullable: false),
                    TimeLimitMinutes = table.Column<int>(type: "int", nullable: true),
                    MaxAttempts = table.Column<int>(type: "int", nullable: true),
                    PassPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    MultiSelectScoring = table.Column<int>(type: "int", nullable: false),
                    ReviewPolicy = table.Column<int>(type: "int", nullable: false),
                    QuestionCount = table.Column<int>(type: "int", nullable: false),
                    ShuffleQuestions = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ShuffleOptions = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CountsTowardCertificate = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_CourseChecklistItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Text = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    Done = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DoneBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DoneAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TemplateId = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_CourseChecklistItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Authoring_CourseChecklistItems_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_CourseTranslations",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    GroupId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LinkedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    LinkedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_CourseTranslations", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Authoring_CourseTranslations_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_ReferralCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    NormalizedCode = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    InstructorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_ReferralCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_ReferralCodes_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CourseCategories",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCategories", x => new { x.CourseId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_CourseCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseCategories_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CourseInstructors",
                columns: table => new
                {
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    RevenueSharePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstructors", x => new { x.CourseId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CourseInstructors_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseInstructors_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CourseSnapshots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    PayloadJson = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Subtitle = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CategoryIds = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false),
                    LessonCount = table.Column<int>(type: "int", nullable: false),
                    TotalDurationSeconds = table.Column<int>(type: "int", nullable: false),
                    SearchText = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PublishedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSnapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseSnapshots_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DiscussionThreads",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    AuthorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Hidden = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Resolved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscussionThreads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscussionThreads_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enrollments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enrollments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enrollments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Modules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modules_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrganizationAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Department = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true),
                    GrantsPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DueAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    AssignedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationAssignments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationAssignments_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Contents = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Currency = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    AccessDays = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ApprovalStatus = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Packages_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ModuleId = table.Column<Guid>(type: "char(36)", nullable: true),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ExternalId = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    CurrentVersion = table.Column<int>(type: "int", nullable: false),
                    PendingVersion = table.Column<int>(type: "int", nullable: true),
                    PendingState = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    ReviewedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions_CaseGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    ExhibitMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ResourceIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_CaseGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_CaseGroups_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RecentlyViewed",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ViewedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecentlyViewed", x => new { x.UserId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_RecentlyViewed_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ResourceFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Kind = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Language = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    FileName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    ContentType = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    SizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    Sha256 = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    StorageKey = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    IsPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UploadedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceFiles_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ReviewComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: true),
                    VideoTimestampSeconds = table.Column<int>(type: "int", nullable: true),
                    AuthorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReviewComments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_FolderCourses",
                columns: table => new
                {
                    FolderId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AddedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_FolderCourses", x => new { x.FolderId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_StudyTools_FolderCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudyTools_FolderCourses_StudyTools_Folders_FolderId",
                        column: x => x.FolderId,
                        principalTable: "StudyTools_Folders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudyTools_PlanCourses",
                columns: table => new
                {
                    PlanId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyTools_PlanCourses", x => new { x.PlanId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_StudyTools_PlanCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudyTools_PlanCourses_StudyTools_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "StudyTools_Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Wishlist",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wishlist", x => new { x.UserId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_Wishlist_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_Policies",
                columns: table => new
                {
                    AssessmentId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AllowPause = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    MaxPauseMinutes = table.Column<int>(type: "int", nullable: false),
                    MaxExposuresPerQuestion = table.Column<int>(type: "int", nullable: true),
                    NegativeMarkingPerWrong = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_Policies", x => x.AssessmentId);
                    table.ForeignKey(
                        name: "FK_Assessment_Policies_Assessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "Assessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Attempts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AssessmentId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeadlineAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ScorePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    PointsEarned = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    PointsPossible = table.Column<int>(type: "int", nullable: true),
                    Passed = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    ScoringPolicy = table.Column<int>(type: "int", nullable: false),
                    PassPercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attempts_Assessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "Assessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SnapshotLessons",
                columns: table => new
                {
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SnapshotId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SnapshotLessons", x => new { x.LessonId, x.SnapshotId });
                    table.ForeignKey(
                        name: "FK_SnapshotLessons_CourseSnapshots_SnapshotId",
                        column: x => x.SnapshotId,
                        principalTable: "CourseSnapshots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DiscussionReplies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ThreadId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AuthorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    IsInstructorReply = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Hidden = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscussionReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscussionReplies_DiscussionThreads_ThreadId",
                        column: x => x.ThreadId,
                        principalTable: "DiscussionThreads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ModuleId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Objective = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsPreview = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    VideoAssetId = table.Column<Guid>(type: "char(36)", nullable: true),
                    NotesMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PremiumNotesMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    NotesVersion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lessons_Modules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Modules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lessons_VideoAssets_VideoAssetId",
                        column: x => x.VideoAssetId,
                        principalTable: "VideoAssets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_BundleItems",
                columns: table => new
                {
                    BundleId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_BundleItems", x => new { x.BundleId, x.PackageId });
                    table.ForeignKey(
                        name: "FK_Commerce_BundleItems_Commerce_Bundles_BundleId",
                        column: x => x.BundleId,
                        principalTable: "Commerce_Bundles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Commerce_BundleItems_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PackagePrices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Countries = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    ProposedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PackagePrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_PackagePrices_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PriceHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    EffectiveFrom = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EffectiveTo = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PriceHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_PriceHistory_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Commerce_PromotionParticipations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    PromotionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OptedInBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WithdrawnAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commerce_PromotionParticipations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commerce_PromotionParticipations_Commerce_Promotions_Promoti~",
                        column: x => x.PromotionId,
                        principalTable: "Commerce_Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Commerce_PromotionParticipations_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_Bookmarks",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_Bookmarks", x => new { x.UserId, x.QuestionId });
                    table.ForeignKey(
                        name: "FK_Assessment_Bookmarks_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_ReviewCards",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Repetitions = table.Column<int>(type: "int", nullable: false),
                    EaseFactor = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    IntervalDays = table.Column<int>(type: "int", nullable: false),
                    DueAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastReviewedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastQuality = table.Column<int>(type: "int", nullable: false),
                    PrevRepetitions = table.Column<int>(type: "int", nullable: false),
                    PrevEaseFactor = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    PrevIntervalDays = table.Column<int>(type: "int", nullable: false),
                    LastPracticeItemId = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_ReviewCards", x => new { x.UserId, x.QuestionId });
                    table.ForeignKey(
                        name: "FK_Assessment_ReviewCards_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AssessmentQuestions",
                columns: table => new
                {
                    AssessmentId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentQuestions", x => new { x.AssessmentId, x.QuestionId });
                    table.ForeignKey(
                        name: "FK_AssessmentQuestions_Assessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "Assessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssessmentQuestions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions_Challenges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Resolution = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    ResolutionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    ResolvedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_Challenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Challenges_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions_Meta",
                columns: table => new
                {
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CognitiveLevel = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    CaseGroupId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CaseGroupOrder = table.Column<int>(type: "int", nullable: false),
                    SourceQuestionId = table.Column<Guid>(type: "char(36)", nullable: true),
                    SourceVersion = table.Column<int>(type: "int", nullable: true),
                    SourceCourseId = table.Column<Guid>(type: "char(36)", nullable: true),
                    Reusable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ReusableSetBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_Meta", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Meta_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuestionVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Stem = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Explanation = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Difficulty = table.Column<int>(type: "int", nullable: false),
                    SkillCode = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CertificationObjective = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    Tags = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    SourceReference = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    AllowShuffle = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EditedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    ReviewedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionVersions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Resources_ScanRecords",
                columns: table => new
                {
                    ResourceFileId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Sha256 = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    Verdict = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false),
                    Engine = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false),
                    ScannedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources_ScanRecords", x => x.ResourceFileId);
                    table.ForeignKey(
                        name: "FK_Resources_ScanRecords_ResourceFiles_ResourceFileId",
                        column: x => x.ResourceFileId,
                        principalTable: "ResourceFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_AttemptCases",
                columns: table => new
                {
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CaseGroupId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Title = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    ExhibitMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ResourceIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    QuestionIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_AttemptCases", x => new { x.AttemptId, x.CaseGroupId });
                    table.ForeignKey(
                        name: "FK_Assessment_AttemptCases_Attempts_AttemptId",
                        column: x => x.AttemptId,
                        principalTable: "Attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_AttemptExtensions",
                columns: table => new
                {
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    BaseTimeLimitMinutes = table.Column<int>(type: "int", nullable: true),
                    AccommodationId = table.Column<Guid>(type: "char(36)", nullable: true),
                    ExtraTimePercent = table.Column<int>(type: "int", nullable: false),
                    Untimed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PausedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    PausedSecondsUsed = table.Column<int>(type: "int", nullable: false),
                    PauseAllowanceSeconds = table.Column<int>(type: "int", nullable: false),
                    NegativeMarkingPerWrong = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_AttemptExtensions", x => x.AttemptId);
                    table.ForeignKey(
                        name: "FK_Assessment_AttemptExtensions_Attempts_AttemptId",
                        column: x => x.AttemptId,
                        principalTable: "Attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_AttemptPauses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PausedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ResumedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreditedSeconds = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_AttemptPauses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_AttemptPauses_Attempts_AttemptId",
                        column: x => x.AttemptId,
                        principalTable: "Attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authoring_LessonRevisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Revision = table.Column<int>(type: "int", nullable: false),
                    NotesMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    PremiumNotesMarkdown = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    AuthorId = table.Column<Guid>(type: "char(36)", nullable: true),
                    RestoredFromRevision = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authoring_LessonRevisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Authoring_LessonRevisions_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LearnerNotes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: true),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    LessonTitleSnapshot = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CourseTitleSnapshot = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    TimestampSeconds = table.Column<int>(type: "int", nullable: true),
                    Body = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Tags = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearnerNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearnerNotes_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_PracticeItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    SessionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    RequiresPremium = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    OptionOrder = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    SelectedOptionIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    CheckedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Points = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    SelfGrade = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_PracticeItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_PracticeItems_Assessment_PracticeSessions_Session~",
                        column: x => x.SessionId,
                        principalTable: "Assessment_PracticeSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assessment_PracticeItems_QuestionVersions_QuestionVersionId",
                        column: x => x.QuestionVersionId,
                        principalTable: "QuestionVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_Regrades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OldCorrectOptionIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    NewCorrectOptionIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Reason = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    ProposedBy = table.Column<Guid>(type: "char(36)", nullable: false),
                    ProposedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    DecidedBy = table.Column<Guid>(type: "char(36)", nullable: true),
                    DecidedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DecisionNote = table.Column<string>(type: "longtext", maxLength: 512, nullable: true),
                    AffectedAttempts = table.Column<int>(type: "int", nullable: false),
                    ChangedAttempts = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_Regrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_Regrades_QuestionVersions_QuestionVersionId",
                        column: x => x.QuestionVersionId,
                        principalTable: "QuestionVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AttemptItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    OptionOrder = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    SelectedOptionIds = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    Flagged = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CheckedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Points = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttemptItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttemptItems_Attempts_AttemptId",
                        column: x => x.AttemptId,
                        principalTable: "Attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttemptItems_QuestionVersions_QuestionVersionId",
                        column: x => x.QuestionVersionId,
                        principalTable: "QuestionVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuestionOptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    IsCorrect = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Rationale = table.Column<string>(type: "longtext", maxLength: 512, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionOptions_QuestionVersions_QuestionVersionId",
                        column: x => x.QuestionVersionId,
                        principalTable: "QuestionVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions_WorkedSolutions",
                columns: table => new
                {
                    QuestionVersionId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Text = table.Column<string>(type: "longtext", maxLength: 512, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_WorkedSolutions", x => x.QuestionVersionId);
                    table.ForeignKey(
                        name: "FK_Questions_WorkedSolutions_QuestionVersions_QuestionVersionId",
                        column: x => x.QuestionVersionId,
                        principalTable: "QuestionVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Assessment_RegradeResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    RegradeId = table.Column<Guid>(type: "char(36)", nullable: false),
                    AttemptId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    OldPointsEarned = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    NewPointsEarned = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OldScorePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    NewScorePercent = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OldPassed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NewPassed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment_RegradeResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assessment_RegradeResults_Assessment_Regrades_RegradeId",
                        column: x => x.RegradeId,
                        principalTable: "Assessment_Regrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assessment_RegradeResults_Attempts_AttemptId",
                        column: x => x.AttemptId,
                        principalTable: "Attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Account_UserSkills_UserId",
                table: "Account_UserSkills",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Chunks_CourseId_SnapshotVersion",
                table: "Ai_Chunks",
                columns: new[] { "CourseId", "SnapshotVersion" });

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Conversations_LastMessageAt",
                table: "Ai_Conversations",
                column: "LastMessageAt");

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Conversations_UserId_CourseId",
                table: "Ai_Conversations",
                columns: new[] { "UserId", "CourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Ai_GeneratedQuestions_CourseId",
                table: "Ai_GeneratedQuestions",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Messages_ConversationId_CreatedAt",
                table: "Ai_Messages",
                columns: new[] { "ConversationId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Ai_PracticeSets_ExpiresAt",
                table: "Ai_PracticeSets",
                column: "ExpiresAt");

            migrationBuilder.CreateIndex(
                name: "IX_Ai_PracticeSets_UserId_CreatedAt",
                table: "Ai_PracticeSets",
                columns: new[] { "UserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Usage_Period_OrganizationId",
                table: "Ai_Usage",
                columns: new[] { "Period", "OrganizationId" });

            migrationBuilder.CreateIndex(
                name: "IX_Ai_Usage_Period_UserId",
                table: "Ai_Usage",
                columns: new[] { "Period", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Analytics_Events_CourseId_Type_OccurredAt",
                table: "Analytics_Events",
                columns: new[] { "CourseId", "Type", "OccurredAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Analytics_Events_Type_OccurredAt",
                table: "Analytics_Events",
                columns: new[] { "Type", "OccurredAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_CourseId",
                table: "Announcements",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_Accommodations_UserId_AssessmentId_RevokedAt",
                table: "Assessment_Accommodations",
                columns: new[] { "UserId", "AssessmentId", "RevokedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_AttemptPauses_AttemptId",
                table: "Assessment_AttemptPauses",
                column: "AttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_Bookmarks_QuestionId",
                table: "Assessment_Bookmarks",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CertificateAppeals_CertificateId_Status",
                table: "Assessment_CertificateAppeals",
                columns: new[] { "CertificateId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CertificateCorrections_CertificateId_Status",
                table: "Assessment_CertificateCorrections",
                columns: new[] { "CertificateId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CertificateFlags_CertificateId",
                table: "Assessment_CertificateFlags",
                column: "CertificateId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CertificateFlags_Status",
                table: "Assessment_CertificateFlags",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CompletionAwards_Code",
                table: "Assessment_CompletionAwards",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CompletionAwards_CourseId",
                table: "Assessment_CompletionAwards",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CompletionAwards_UserId_CourseId",
                table: "Assessment_CompletionAwards",
                columns: new[] { "UserId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_CourseCertificateSettings_TemplateId",
                table: "Assessment_CourseCertificateSettings",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_PracticeItems_QuestionId",
                table: "Assessment_PracticeItems",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_PracticeItems_QuestionVersionId",
                table: "Assessment_PracticeItems",
                column: "QuestionVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_PracticeItems_SessionId",
                table: "Assessment_PracticeItems",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_PracticeSessions_UserId_CreatedAt",
                table: "Assessment_PracticeSessions",
                columns: new[] { "UserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_RegradeResults_AttemptId",
                table: "Assessment_RegradeResults",
                column: "AttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_RegradeResults_RegradeId",
                table: "Assessment_RegradeResults",
                column: "RegradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_Regrades_QuestionVersionId_Status",
                table: "Assessment_Regrades",
                columns: new[] { "QuestionVersionId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_ReviewCards_QuestionId",
                table: "Assessment_ReviewCards",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_ReviewCards_UserId_DueAt",
                table: "Assessment_ReviewCards",
                columns: new[] { "UserId", "DueAt" });

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentQuestions_QuestionId",
                table: "AssessmentQuestions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessments_CourseId",
                table: "Assessments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_AttemptItems_AttemptId",
                table: "AttemptItems",
                column: "AttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_AttemptItems_QuestionVersionId",
                table: "AttemptItems",
                column: "QuestionVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_AssessmentId",
                table: "Attempts",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_UserId_AssessmentId",
                table: "Attempts",
                columns: new[] { "UserId", "AssessmentId" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_EntityType_EntityId",
                table: "AuditLogs",
                columns: new[] { "EntityType", "EntityId" });

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_AgreementAcceptances_AgreementVersionId_UserId",
                table: "Authoring_AgreementAcceptances",
                columns: new[] { "AgreementVersionId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_AgreementAcceptances_UserId",
                table: "Authoring_AgreementAcceptances",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_AgreementVersions_PublishedAt",
                table: "Authoring_AgreementVersions",
                column: "PublishedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_AgreementVersions_Version",
                table: "Authoring_AgreementVersions",
                column: "Version",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_CourseChecklistItems_CourseId_SortOrder",
                table: "Authoring_CourseChecklistItems",
                columns: new[] { "CourseId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_CourseTemplates_Name",
                table: "Authoring_CourseTemplates",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_CourseTranslations_GroupId",
                table: "Authoring_CourseTranslations",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_LessonRevisions_CourseId_CreatedAt",
                table: "Authoring_LessonRevisions",
                columns: new[] { "CourseId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Authoring_LessonRevisions_LessonId_Revision",
                table: "Authoring_LessonRevisions",
                columns: new[] { "LessonId", "Revision" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Slug",
                table: "Categories",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Certificates_Code",
                table: "Certificates",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Certificates_UserId_CourseId",
                table: "Certificates",
                columns: new[] { "UserId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_AffiliateClicks_AffiliateId",
                table: "Commerce_AffiliateClicks",
                column: "AffiliateId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Affiliates_NormalizedCode",
                table: "Commerce_Affiliates",
                column: "NormalizedCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_BundleItems_PackageId",
                table: "Commerce_BundleItems",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_ConsumptionEvents_OccurredAt_CourseId",
                table: "Commerce_ConsumptionEvents",
                columns: new[] { "OccurredAt", "CourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_CouponRedemptions_CouponId_UserId",
                table: "Commerce_CouponRedemptions",
                columns: new[] { "CouponId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_CouponRedemptions_OrderId",
                table: "Commerce_CouponRedemptions",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Coupons_CreatedBy",
                table: "Commerce_Coupons",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Coupons_NormalizedCode",
                table: "Commerce_Coupons",
                column: "NormalizedCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Disputes_OrderId",
                table: "Commerce_Disputes",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Disputes_ProviderDisputeId",
                table: "Commerce_Disputes",
                column: "ProviderDisputeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_GiftCodes_CodeHash",
                table: "Commerce_GiftCodes",
                column: "CodeHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_GiftCodes_OrderId",
                table: "Commerce_GiftCodes",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Invoices_Kind_Year_Sequence",
                table: "Commerce_Invoices",
                columns: new[] { "Kind", "Year", "Sequence" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Invoices_Number",
                table: "Commerce_Invoices",
                column: "Number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Invoices_OrderId",
                table: "Commerce_Invoices",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Invoices_RefundId",
                table: "Commerce_Invoices",
                column: "RefundId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Invoices_UserId",
                table: "Commerce_Invoices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_LedgerSources_OrderId",
                table: "Commerce_LedgerSources",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_LedgerSources_RelatedEntryId",
                table: "Commerce_LedgerSources",
                column: "RelatedEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_LedgerSources_SourceType_SourceId",
                table: "Commerce_LedgerSources",
                columns: new[] { "SourceType", "SourceId" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_OrderDetails_SubscriptionId",
                table: "Commerce_OrderDetails",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PackagePrices_PackageId_Currency_Status",
                table: "Commerce_PackagePrices",
                columns: new[] { "PackageId", "Currency", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PayoutRequestEntries_PayoutRequestId",
                table: "Commerce_PayoutRequestEntries",
                column: "PayoutRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PayoutRequests_InstructorId_Status",
                table: "Commerce_PayoutRequests",
                columns: new[] { "InstructorId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Plans_Code",
                table: "Commerce_Plans",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PoolAllocationLines_AllocationId_CourseId",
                table: "Commerce_PoolAllocationLines",
                columns: new[] { "AllocationId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PoolAllocations_Year_Month_Currency",
                table: "Commerce_PoolAllocations",
                columns: new[] { "Year", "Month", "Currency" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PriceHistory_PackageId_Currency_EffectiveFrom",
                table: "Commerce_PriceHistory",
                columns: new[] { "PackageId", "Currency", "EffectiveFrom" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PromotionParticipations_PackageId",
                table: "Commerce_PromotionParticipations",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_PromotionParticipations_PromotionId_PackageId",
                table: "Commerce_PromotionParticipations",
                columns: new[] { "PromotionId", "PackageId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_ReferralCodes_CourseId",
                table: "Commerce_ReferralCodes",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_ReferralCodes_NormalizedCode",
                table: "Commerce_ReferralCodes",
                column: "NormalizedCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_SubscriptionEntitlements_SubscriptionId",
                table: "Commerce_SubscriptionEntitlements",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_SubscriptionInvoices_OrderId",
                table: "Commerce_SubscriptionInvoices",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_SubscriptionInvoices_PaidAt_Currency",
                table: "Commerce_SubscriptionInvoices",
                columns: new[] { "PaidAt", "Currency" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_SubscriptionInvoices_ProviderInvoiceId",
                table: "Commerce_SubscriptionInvoices",
                column: "ProviderInvoiceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_SubscriptionInvoices_SubscriptionId",
                table: "Commerce_SubscriptionInvoices",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Subscriptions_PlanId",
                table: "Commerce_Subscriptions",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Subscriptions_ProviderSubscriptionId",
                table: "Commerce_Subscriptions",
                column: "ProviderSubscriptionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Subscriptions_Status_GraceUntil",
                table: "Commerce_Subscriptions",
                columns: new[] { "Status", "GraceUntil" });

            migrationBuilder.CreateIndex(
                name: "IX_Commerce_Subscriptions_UserId_IdempotencyKey",
                table: "Commerce_Subscriptions",
                columns: new[] { "UserId", "IdempotencyKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CommissionLedger_OrderId_InstructorId_Kind",
                table: "CommissionLedger",
                columns: new[] { "OrderId", "InstructorId", "Kind" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseCategories_CategoryId",
                table: "CourseCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstructors_UserId",
                table: "CourseInstructors",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseReviews_CourseId_UserId",
                table: "CourseReviews",
                columns: new[] { "CourseId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_Code",
                table: "Courses",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_OwnerId",
                table: "Courses",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_Slug",
                table: "Courses",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_Status",
                table: "Courses",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_YouTubeChannelId",
                table: "Courses",
                column: "YouTubeChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSnapshots_CourseId_Version",
                table: "CourseSnapshots",
                columns: new[] { "CourseId", "Version" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionReplies_ThreadId",
                table: "DiscussionReplies",
                column: "ThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionThreads_CourseId_CreatedAt",
                table: "DiscussionThreads",
                columns: new[] { "CourseId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_EmailOutbox_SentAt_NextAttemptAt",
                table: "EmailOutbox",
                columns: new[] { "SentAt", "NextAttemptAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseId",
                table: "Enrollments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserId_CourseId",
                table: "Enrollments",
                columns: new[] { "UserId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_Orders_OrderId",
                table: "Enterprise_Orders",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_Orders_OrganizationId",
                table: "Enterprise_Orders",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_Orders_SeatRequestId",
                table: "Enterprise_Orders",
                column: "SeatRequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_OrgMaterials_OrganizationId_DeletedAt",
                table: "Enterprise_OrgMaterials",
                columns: new[] { "OrganizationId", "DeletedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_PathwayAssignmentCourses_OrganizationAssignmentId",
                table: "Enterprise_PathwayAssignmentCourses",
                column: "OrganizationAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_PathwayAssignments_OrganizationId_PathwayId",
                table: "Enterprise_PathwayAssignments",
                columns: new[] { "OrganizationId", "PathwayId" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SeatRequests_OrganizationId",
                table: "Enterprise_SeatRequests",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SeatRequests_Status_CreatedAt",
                table: "Enterprise_SeatRequests",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoDomains_Domain_Status",
                table: "Enterprise_SsoDomains",
                columns: new[] { "Domain", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoDomains_OrganizationId_Domain",
                table: "Enterprise_SsoDomains",
                columns: new[] { "OrganizationId", "Domain" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoDomains_Status_CreatedAt",
                table: "Enterprise_SsoDomains",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoIdentities_OrganizationId_IssuerHash_Subject",
                table: "Enterprise_SsoIdentities",
                columns: new[] { "OrganizationId", "IssuerHash", "Subject" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoIdentities_OrganizationId_UserId",
                table: "Enterprise_SsoIdentities",
                columns: new[] { "OrganizationId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoIdentities_UserId",
                table: "Enterprise_SsoIdentities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoLoginStates_ExpiresAt",
                table: "Enterprise_SsoLoginStates",
                column: "ExpiresAt");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprise_SsoLoginStates_HandoffHash",
                table: "Enterprise_SsoLoginStates",
                column: "HandoffHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entitlements_UserId_CourseId",
                table: "Entitlements",
                columns: new[] { "UserId", "CourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Identity_AuthSessions_UserId",
                table: "Identity_AuthSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Identity_MfaChallenges_TokenHash",
                table: "Identity_MfaChallenges",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Identity_MfaChallenges_UserId",
                table: "Identity_MfaChallenges",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Identity_MfaRecoveryCodes_UserId_CodeHash",
                table: "Identity_MfaRecoveryCodes",
                columns: new[] { "UserId", "CodeHash" });

            migrationBuilder.CreateIndex(
                name: "IX_Identity_MfaResets_UserId_ReenrolledAt",
                table: "Identity_MfaResets",
                columns: new[] { "UserId", "ReenrolledAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Identity_OneTimeTokens_TokenHash",
                table: "Identity_OneTimeTokens",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Identity_OneTimeTokens_UserId_Purpose_CreatedAt",
                table: "Identity_OneTimeTokens",
                columns: new[] { "UserId", "Purpose", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_ImportBatches_UserId_IdempotencyKey",
                table: "ImportBatches",
                columns: new[] { "UserId", "IdempotencyKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InstructorApplications_UserId",
                table: "InstructorApplications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_InstructorInvitations_CodeHash",
                table: "InstructorInvitations",
                column: "CodeHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LearnerNotes_LessonId",
                table: "LearnerNotes",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_LearnerNotes_UserId_LessonId",
                table: "LearnerNotes",
                columns: new[] { "UserId", "LessonId" });

            migrationBuilder.CreateIndex(
                name: "IX_LessonProgress_LessonId",
                table: "LessonProgress",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_ModuleId",
                table: "Lessons",
                column: "ModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_VideoAssetId",
                table: "Lessons",
                column: "VideoAssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Conversations_CourseId_LastMessageAt",
                table: "Messaging_Conversations",
                columns: new[] { "CourseId", "LastMessageAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Conversations_CourseId_LearnerId",
                table: "Messaging_Conversations",
                columns: new[] { "CourseId", "LearnerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Conversations_LearnerId_LastMessageAt",
                table: "Messaging_Conversations",
                columns: new[] { "LearnerId", "LastMessageAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Messages_ConversationId_CreatedAt",
                table: "Messaging_Messages",
                columns: new[] { "ConversationId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Messages_SenderId_CreatedAt",
                table: "Messaging_Messages",
                columns: new[] { "SenderId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Messaging_Reports_MessageId_ReporterId",
                table: "Messaging_Reports",
                columns: new[] { "MessageId", "ReporterId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Modules_CourseId",
                table: "Modules",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId_ReadAt_CreatedAt",
                table: "Notifications",
                columns: new[] { "UserId", "ReadAt", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Operations_BrokenLinkNotices_VideoAssetId_NotifiedAt",
                table: "Operations_BrokenLinkNotices",
                columns: new[] { "VideoAssetId", "NotifiedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProviderSessionId",
                table: "Orders",
                column: "ProviderSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId_IdempotencyKey",
                table: "Orders",
                columns: new[] { "UserId", "IdempotencyKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationAssignments_CourseId",
                table: "OrganizationAssignments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationAssignments_OrganizationId",
                table: "OrganizationAssignments",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationInvitations_OrganizationId_NormalizedEmail",
                table: "OrganizationInvitations",
                columns: new[] { "OrganizationId", "NormalizedEmail" });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationInvitations_TokenHash",
                table: "OrganizationInvitations",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_UserId",
                table: "OrganizationMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_Slug",
                table: "Organizations",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_CourseId",
                table: "Packages",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ProviderPaymentId",
                table: "Payments",
                column: "ProviderPaymentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuestionOptions_QuestionVersionId",
                table: "QuestionOptions",
                column: "QuestionVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CourseId_ExternalId",
                table: "Questions",
                columns: new[] { "CourseId", "ExternalId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CaseGroups_CourseId",
                table: "Questions_CaseGroups",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Challenges_QuestionId",
                table: "Questions_Challenges",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Challenges_Status_CreatedAt",
                table: "Questions_Challenges",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Challenges_UserId_QuestionId_Status",
                table: "Questions_Challenges",
                columns: new[] { "UserId", "QuestionId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ImportJobs_Status_QueuedAt",
                table: "Questions_ImportJobs",
                columns: new[] { "Status", "QueuedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Meta_CaseGroupId",
                table: "Questions_Meta",
                column: "CaseGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_Meta_Reusable",
                table: "Questions_Meta",
                column: "Reusable");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionVersions_QuestionId_Version",
                table: "QuestionVersions",
                columns: new[] { "QuestionId", "Version" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecentlyViewed_CourseId",
                table: "RecentlyViewed",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_TokenHash",
                table: "RefreshTokens",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_OrderId",
                table: "Refunds",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceFiles_CourseId_LessonId",
                table: "ResourceFiles",
                columns: new[] { "CourseId", "LessonId" });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewComments_CourseId",
                table: "ReviewComments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_SnapshotLessons_LessonId_CourseId_Version",
                table: "SnapshotLessons",
                columns: new[] { "LessonId", "CourseId", "Version" });

            migrationBuilder.CreateIndex(
                name: "IX_SnapshotLessons_SnapshotId",
                table: "SnapshotLessons",
                column: "SnapshotId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_Bookmarks_UserId_CourseId_CreatedAt",
                table: "StudyTools_Bookmarks",
                columns: new[] { "UserId", "CourseId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_Bookmarks_UserId_LessonId_TimestampSeconds",
                table: "StudyTools_Bookmarks",
                columns: new[] { "UserId", "LessonId", "TimestampSeconds" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_CalendarTokens_TokenHash",
                table: "StudyTools_CalendarTokens",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_FolderCourses_CourseId",
                table: "StudyTools_FolderCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_Folders_UserId_Name",
                table: "StudyTools_Folders",
                columns: new[] { "UserId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_PlanCourses_CourseId",
                table: "StudyTools_PlanCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_PlanItems_PlanId_SortOrder",
                table: "StudyTools_PlanItems",
                columns: new[] { "PlanId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_PlanItems_ReminderSentAt_ScheduledAt",
                table: "StudyTools_PlanItems",
                columns: new[] { "ReminderSentAt", "ScheduledAt" });

            migrationBuilder.CreateIndex(
                name: "IX_StudyTools_Plans_UserId",
                table: "StudyTools_Plans",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CertificationIssuers_Name",
                table: "Taxonomy_CertificationIssuers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CertificationObjectives_CertificationId_Code",
                table: "Taxonomy_CertificationObjectives",
                columns: new[] { "CertificationId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Certifications_IssuerId",
                table: "Taxonomy_Certifications",
                column: "IssuerId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Certifications_Slug",
                table: "Taxonomy_Certifications",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Certifications_State",
                table: "Taxonomy_Certifications",
                column: "State");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Collections_Slug",
                table: "Taxonomy_Collections",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CourseCertifications_CertificationId",
                table: "Taxonomy_CourseCertifications",
                column: "CertificationId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CourseIdeas_State",
                table: "Taxonomy_CourseIdeas",
                column: "State");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CourseIdeas_Title",
                table: "Taxonomy_CourseIdeas",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CourseSkills_CourseId_SkillId",
                table: "Taxonomy_CourseSkills",
                columns: new[] { "CourseId", "SkillId" });

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CourseSkills_SkillId",
                table: "Taxonomy_CourseSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_ObjectiveLessons_LessonId",
                table: "Taxonomy_ObjectiveLessons",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_ObjectiveQuestions_QuestionId",
                table: "Taxonomy_ObjectiveQuestions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Pathways_Slug",
                table: "Taxonomy_Pathways",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_Skills_Code",
                table: "Taxonomy_Skills",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trust_Complaints_Status_CreatedAt",
                table: "Trust_Complaints",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Trust_Complaints_TargetType_TargetId",
                table: "Trust_Complaints",
                columns: new[] { "TargetType", "TargetId" });

            migrationBuilder.CreateIndex(
                name: "IX_Trust_ContentHolds_TargetId_ReleasedAt",
                table: "Trust_ContentHolds",
                columns: new[] { "TargetId", "ReleasedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Trust_InstructorSuspensions_UserId_ReinstatedAt",
                table: "Trust_InstructorSuspensions",
                columns: new[] { "UserId", "ReinstatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Trust_ModerationAppeals_Status_CreatedAt",
                table: "Trust_ModerationAppeals",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Trust_ModerationAppeals_TargetType_TargetId",
                table: "Trust_ModerationAppeals",
                columns: new[] { "TargetType", "TargetId" });

            migrationBuilder.CreateIndex(
                name: "IX_UploadSessions_ChannelId",
                table: "UploadSessions",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_NormalizedEmail",
                table: "Users",
                column: "NormalizedEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VideoAssets_ChannelId",
                table: "VideoAssets",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoAssets_YouTubeVideoId",
                table: "VideoAssets",
                column: "YouTubeVideoId");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_CourseId",
                table: "Wishlist",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_YouTubeChannels_ChannelId",
                table: "YouTubeChannels",
                column: "ChannelId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account_LearningGoals");

            migrationBuilder.DropTable(
                name: "Account_Profiles");

            migrationBuilder.DropTable(
                name: "Account_UserSkills");

            migrationBuilder.DropTable(
                name: "Ai_Chunks");

            migrationBuilder.DropTable(
                name: "Ai_GeneratedQuestions");

            migrationBuilder.DropTable(
                name: "Ai_IndexStates");

            migrationBuilder.DropTable(
                name: "Ai_Messages");

            migrationBuilder.DropTable(
                name: "Ai_PracticeSets");

            migrationBuilder.DropTable(
                name: "Ai_Usage");

            migrationBuilder.DropTable(
                name: "Analytics_Consents");

            migrationBuilder.DropTable(
                name: "Analytics_Events");

            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropTable(
                name: "Assessment_Accommodations");

            migrationBuilder.DropTable(
                name: "Assessment_AttemptCases");

            migrationBuilder.DropTable(
                name: "Assessment_AttemptExtensions");

            migrationBuilder.DropTable(
                name: "Assessment_AttemptPauses");

            migrationBuilder.DropTable(
                name: "Assessment_Bookmarks");

            migrationBuilder.DropTable(
                name: "Assessment_CertificateAppeals");

            migrationBuilder.DropTable(
                name: "Assessment_CertificateCorrections");

            migrationBuilder.DropTable(
                name: "Assessment_CertificateFlags");

            migrationBuilder.DropTable(
                name: "Assessment_CompletionAwards");

            migrationBuilder.DropTable(
                name: "Assessment_CompletionAwardSettings");

            migrationBuilder.DropTable(
                name: "Assessment_CourseCertificateSettings");

            migrationBuilder.DropTable(
                name: "Assessment_Policies");

            migrationBuilder.DropTable(
                name: "Assessment_PracticeItems");

            migrationBuilder.DropTable(
                name: "Assessment_RegradeResults");

            migrationBuilder.DropTable(
                name: "Assessment_ReviewCards");

            migrationBuilder.DropTable(
                name: "AssessmentQuestions");

            migrationBuilder.DropTable(
                name: "AttemptItems");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "Authoring_AgreementAcceptances");

            migrationBuilder.DropTable(
                name: "Authoring_CourseChecklistItems");

            migrationBuilder.DropTable(
                name: "Authoring_CourseTemplates");

            migrationBuilder.DropTable(
                name: "Authoring_CourseTranslations");

            migrationBuilder.DropTable(
                name: "Authoring_LessonRevisions");

            migrationBuilder.DropTable(
                name: "Commerce_AffiliateClicks");

            migrationBuilder.DropTable(
                name: "Commerce_BundleItems");

            migrationBuilder.DropTable(
                name: "Commerce_ConsumptionEvents");

            migrationBuilder.DropTable(
                name: "Commerce_CouponGiftPolicies");

            migrationBuilder.DropTable(
                name: "Commerce_CouponRedemptions");

            migrationBuilder.DropTable(
                name: "Commerce_Disputes");

            migrationBuilder.DropTable(
                name: "Commerce_GiftCodes");

            migrationBuilder.DropTable(
                name: "Commerce_InvoiceCounters");

            migrationBuilder.DropTable(
                name: "Commerce_InvoiceSellerSnapshots");

            migrationBuilder.DropTable(
                name: "Commerce_LedgerSources");

            migrationBuilder.DropTable(
                name: "Commerce_OrderDetails");

            migrationBuilder.DropTable(
                name: "Commerce_PackagePrices");

            migrationBuilder.DropTable(
                name: "Commerce_PayoutProfiles");

            migrationBuilder.DropTable(
                name: "Commerce_PayoutRequestEntries");

            migrationBuilder.DropTable(
                name: "Commerce_PoolAllocationLines");

            migrationBuilder.DropTable(
                name: "Commerce_PriceHistory");

            migrationBuilder.DropTable(
                name: "Commerce_PromotionParticipations");

            migrationBuilder.DropTable(
                name: "Commerce_ReferralCodes");

            migrationBuilder.DropTable(
                name: "Commerce_SubscriptionEntitlements");

            migrationBuilder.DropTable(
                name: "Commerce_SubscriptionInvoices");

            migrationBuilder.DropTable(
                name: "Commerce_TaxRates");

            migrationBuilder.DropTable(
                name: "CourseCategories");

            migrationBuilder.DropTable(
                name: "CourseInstructors");

            migrationBuilder.DropTable(
                name: "CourseReviews");

            migrationBuilder.DropTable(
                name: "DiscussionReplies");

            migrationBuilder.DropTable(
                name: "EmailOutbox");

            migrationBuilder.DropTable(
                name: "Engagement_ModerationNotes");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "Enterprise_Orders");

            migrationBuilder.DropTable(
                name: "Enterprise_OrgMaterials");

            migrationBuilder.DropTable(
                name: "Enterprise_PathwayAssignmentCourses");

            migrationBuilder.DropTable(
                name: "Enterprise_PathwayAssignments");

            migrationBuilder.DropTable(
                name: "Enterprise_SeatRequests");

            migrationBuilder.DropTable(
                name: "Enterprise_SsoConfigs");

            migrationBuilder.DropTable(
                name: "Enterprise_SsoDomains");

            migrationBuilder.DropTable(
                name: "Enterprise_SsoIdentities");

            migrationBuilder.DropTable(
                name: "Enterprise_SsoLoginStates");

            migrationBuilder.DropTable(
                name: "Identity_AuthSessions");

            migrationBuilder.DropTable(
                name: "Identity_MfaChallenges");

            migrationBuilder.DropTable(
                name: "Identity_MfaRecoveryCodes");

            migrationBuilder.DropTable(
                name: "Identity_MfaResets");

            migrationBuilder.DropTable(
                name: "Identity_OneTimeTokens");

            migrationBuilder.DropTable(
                name: "Identity_UserSecurity");

            migrationBuilder.DropTable(
                name: "InstructorApplications");

            migrationBuilder.DropTable(
                name: "InstructorInvitations");

            migrationBuilder.DropTable(
                name: "LearnerNotes");

            migrationBuilder.DropTable(
                name: "LessonProgress");

            migrationBuilder.DropTable(
                name: "Messaging_AutoMessageDeliveries");

            migrationBuilder.DropTable(
                name: "Messaging_Blocks");

            migrationBuilder.DropTable(
                name: "Messaging_CourseAutoMessages");

            migrationBuilder.DropTable(
                name: "Messaging_Messages");

            migrationBuilder.DropTable(
                name: "Messaging_ReadMarkers");

            migrationBuilder.DropTable(
                name: "Messaging_Reports");

            migrationBuilder.DropTable(
                name: "Messaging_WorkerState");

            migrationBuilder.DropTable(
                name: "NotificationPreferences");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OAuthNonces");

            migrationBuilder.DropTable(
                name: "Operations_BrokenLinkNotices");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "OrganizationAssignments");

            migrationBuilder.DropTable(
                name: "OrganizationInvitations");

            migrationBuilder.DropTable(
                name: "OrganizationMembers");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "PayoutBatches");

            migrationBuilder.DropTable(
                name: "PlatformSettings");

            migrationBuilder.DropTable(
                name: "ProcessedWebhookEvents");

            migrationBuilder.DropTable(
                name: "QuestionOptions");

            migrationBuilder.DropTable(
                name: "Questions_CaseGroups");

            migrationBuilder.DropTable(
                name: "Questions_Challenges");

            migrationBuilder.DropTable(
                name: "Questions_ImportJobs");

            migrationBuilder.DropTable(
                name: "Questions_Meta");

            migrationBuilder.DropTable(
                name: "Questions_WorkedSolutions");

            migrationBuilder.DropTable(
                name: "RecentlyViewed");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "Resources_ScanRecords");

            migrationBuilder.DropTable(
                name: "ReviewComments");

            migrationBuilder.DropTable(
                name: "SnapshotLessons");

            migrationBuilder.DropTable(
                name: "StudyTools_Bookmarks");

            migrationBuilder.DropTable(
                name: "StudyTools_CalendarTokens");

            migrationBuilder.DropTable(
                name: "StudyTools_FolderCourses");

            migrationBuilder.DropTable(
                name: "StudyTools_PlanCourses");

            migrationBuilder.DropTable(
                name: "StudyTools_PlanItems");

            migrationBuilder.DropTable(
                name: "Taxonomy_BestsellerStats");

            migrationBuilder.DropTable(
                name: "Taxonomy_CertificationIssuers");

            migrationBuilder.DropTable(
                name: "Taxonomy_CertificationObjectives");

            migrationBuilder.DropTable(
                name: "Taxonomy_Certifications");

            migrationBuilder.DropTable(
                name: "Taxonomy_CollectionCourses");

            migrationBuilder.DropTable(
                name: "Taxonomy_Collections");

            migrationBuilder.DropTable(
                name: "Taxonomy_CourseCertifications");

            migrationBuilder.DropTable(
                name: "Taxonomy_CourseIdeas");

            migrationBuilder.DropTable(
                name: "Taxonomy_CourseSkills");

            migrationBuilder.DropTable(
                name: "Taxonomy_ObjectiveLessons");

            migrationBuilder.DropTable(
                name: "Taxonomy_ObjectiveQuestions");

            migrationBuilder.DropTable(
                name: "Taxonomy_PathwayCourses");

            migrationBuilder.DropTable(
                name: "Taxonomy_Pathways");

            migrationBuilder.DropTable(
                name: "Taxonomy_PathwaySkills");

            migrationBuilder.DropTable(
                name: "Taxonomy_Skills");

            migrationBuilder.DropTable(
                name: "Trust_Complaints");

            migrationBuilder.DropTable(
                name: "Trust_ContentHolds");

            migrationBuilder.DropTable(
                name: "Trust_InstructorSuspensions");

            migrationBuilder.DropTable(
                name: "Trust_ModerationAppeals");

            migrationBuilder.DropTable(
                name: "UploadSessions");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Wishlist");

            migrationBuilder.DropTable(
                name: "Ai_Conversations");

            migrationBuilder.DropTable(
                name: "Certificates");

            migrationBuilder.DropTable(
                name: "Assessment_CertificateTemplates");

            migrationBuilder.DropTable(
                name: "Assessment_PracticeSessions");

            migrationBuilder.DropTable(
                name: "Assessment_Regrades");

            migrationBuilder.DropTable(
                name: "Attempts");

            migrationBuilder.DropTable(
                name: "Authoring_AgreementVersions");

            migrationBuilder.DropTable(
                name: "Commerce_Affiliates");

            migrationBuilder.DropTable(
                name: "Commerce_Bundles");

            migrationBuilder.DropTable(
                name: "Commerce_Coupons");

            migrationBuilder.DropTable(
                name: "Commerce_Invoices");

            migrationBuilder.DropTable(
                name: "CommissionLedger");

            migrationBuilder.DropTable(
                name: "Commerce_PayoutRequests");

            migrationBuilder.DropTable(
                name: "Commerce_PoolAllocations");

            migrationBuilder.DropTable(
                name: "Commerce_Promotions");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "Entitlements");

            migrationBuilder.DropTable(
                name: "Commerce_Subscriptions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "DiscussionThreads");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Messaging_Conversations");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "ImportBatches");

            migrationBuilder.DropTable(
                name: "ResourceFiles");

            migrationBuilder.DropTable(
                name: "CourseSnapshots");

            migrationBuilder.DropTable(
                name: "StudyTools_Folders");

            migrationBuilder.DropTable(
                name: "StudyTools_Plans");

            migrationBuilder.DropTable(
                name: "QuestionVersions");

            migrationBuilder.DropTable(
                name: "Assessments");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Commerce_Plans");

            migrationBuilder.DropTable(
                name: "Modules");

            migrationBuilder.DropTable(
                name: "VideoAssets");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "YouTubeChannels");
        }
    }
}
