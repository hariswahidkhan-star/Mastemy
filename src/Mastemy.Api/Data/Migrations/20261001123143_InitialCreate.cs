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
                name: "Entitlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    CourseId = table.Column<Guid>(type: "char(36)", nullable: false),
                    PackageId = table.Column<Guid>(type: "char(36)", nullable: true),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: true),
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
                    table.ForeignKey(
                        name: "FK_LessonProgress_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Enrollments_CourseId",
                table: "Enrollments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserId_CourseId",
                table: "Enrollments",
                columns: new[] { "UserId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entitlements_UserId_CourseId",
                table: "Entitlements",
                columns: new[] { "UserId", "CourseId" });

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
                name: "IX_Modules_CourseId",
                table: "Modules",
                column: "CourseId");

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
                name: "IX_QuestionVersions_QuestionId_Version",
                table: "QuestionVersions",
                columns: new[] { "QuestionId", "Version" },
                unique: true);

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
                name: "IX_ReviewComments_CourseId",
                table: "ReviewComments",
                column: "CourseId");

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
                name: "IX_YouTubeChannels_ChannelId",
                table: "YouTubeChannels",
                column: "ChannelId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssessmentQuestions");

            migrationBuilder.DropTable(
                name: "AttemptItems");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "Certificates");

            migrationBuilder.DropTable(
                name: "CommissionLedger");

            migrationBuilder.DropTable(
                name: "CourseCategories");

            migrationBuilder.DropTable(
                name: "CourseInstructors");

            migrationBuilder.DropTable(
                name: "CourseReviews");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "Entitlements");

            migrationBuilder.DropTable(
                name: "ImportBatches");

            migrationBuilder.DropTable(
                name: "InstructorApplications");

            migrationBuilder.DropTable(
                name: "InstructorInvitations");

            migrationBuilder.DropTable(
                name: "LearnerNotes");

            migrationBuilder.DropTable(
                name: "LessonProgress");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Packages");

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
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "ReviewComments");

            migrationBuilder.DropTable(
                name: "UploadSessions");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Attempts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "QuestionVersions");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Assessments");

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
