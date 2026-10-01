using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Commerce;

[ApiController]
[Authorize]
public class CommerceController(CommerceService svc) : ControllerBase
{
    [HttpPost("api/studio/courses/{id:guid}/packages")]
    public Task<PackageDto> Propose(Guid id, PackageInput input) => svc.ProposePackage(id, input);

    [HttpGet("api/studio/courses/{id:guid}/packages")]
    public Task<List<PackageDto>> CoursePackages(Guid id) => svc.CoursePackages(id);

    [HttpGet("api/admin/packages"), Authorize(Policy = "Staff")]
    public Task<List<PackageDto>> AdminPackages([FromQuery] string? status) => svc.AdminPackages(status);

    [HttpPost("api/admin/packages/{id:guid}/decision"), Authorize(Policy = "Staff")]
    public Task<PackageDto> Decide(Guid id, DecisionInput input) => svc.DecidePackage(id, input);

    [HttpPost("api/checkout")]
    public Task<CheckoutResponse> Checkout(CheckoutInput input) => svc.Checkout(input);

    [HttpGet("api/me/orders")]
    public Task<List<OrderDto>> MyOrders() => svc.MyOrders();

    [HttpPost("api/me/orders/{id:guid}/refund-request")]
    public Task<RefundDto> RefundRequest(Guid id, RefundRequestInput input) => svc.RequestRefund(id, input);

    [HttpGet("api/admin/refunds"), Authorize(Policy = "Finance")]
    public Task<List<RefundDto>> Refunds([FromQuery] string? status) => svc.AdminRefunds(status);

    [HttpPost("api/admin/refunds/{id:guid}/decision"), Authorize(Policy = "Finance")]
    public Task<RefundDto> DecideRefund(Guid id, DecisionInput input) => svc.DecideRefund(id, input);

    [HttpGet("api/studio/earnings"), Authorize(Policy = "Instructor")]
    public Task<EarningsDto> Earnings() => svc.MyEarnings();

    [HttpGet("api/admin/payout-batches"), Authorize(Policy = "Finance")]
    public Task<List<PayoutBatchDto>> Batches() => svc.PayoutBatches();

    [HttpPost("api/admin/payout-batches"), Authorize(Policy = "Finance")]
    public Task<PayoutBatchDto> CreateBatch() => svc.CreatePayoutBatch();

    [HttpPost("api/admin/payout-batches/{id:guid}/approve"), Authorize(Policy = "Finance")]
    public Task<PayoutBatchDto> ApproveBatch(Guid id) => svc.ApprovePayoutBatch(id);
}

[ApiController]
[AllowAnonymous]
public class StripeWebhookController(CommerceService svc) : ControllerBase
{
    private const int MaxBodyBytes = 512 * 1024;

    /// <summary>Raw body is read unmodified so the Stripe-Signature HMAC can be verified byte-for-byte.</summary>
    [HttpPost("api/webhooks/stripe")]
    [RequestSizeLimit(MaxBodyBytes)]
    public async Task<WebhookResult> Stripe()
    {
        using var ms = new MemoryStream();
        await Request.Body.CopyToAsync(ms, HttpContext.RequestAborted);
        return await svc.HandleStripeWebhook(ms.ToArray(), Request.Headers["Stripe-Signature"].ToString());
    }
}
