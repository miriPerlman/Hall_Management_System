using BL.Api;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        IBLInvitation invitationActions;
        IBLauthorization authorizationActions;
        IBLcustomer customerActions;
        IBLdish dishActions;
        public InvitationsController(IBlManager bl)
        {
            invitationActions = bl.BlInvitation;
            authorizationActions = bl.BlAuthorization;
            dishActions=bl.Bldish;
            customerActions = bl.BlCustomer;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllInvitations()
        {
            var allinvitations = await invitationActions.GetAll();
            if (allinvitations == null || allinvitations.Count == 0)
            {
                return NotFound("ERROR!! there are no available customers!!");
            }
            return Ok(allinvitations);
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetInvitationsHistory(int customerId)
        {
            var invitations = await invitationActions.GetByCustomerId(customerId);
            if (invitations == null || invitations.Count == 0)
            {
                return NotFound("No invitations found for this customer.");
            }
            return Ok(invitations);
        }


        [HttpPost("createNewInvitation")]
        public async Task<ActionResult<Invitation>> CreateNewInvitation([FromBody] InvitationDTO dto)
        {
            {
                var customerFromDb = await authorizationActions.GetCustomerByIdAsync(dto.CustomerId);
                if (customerFromDb == null)
                {
                    var workerFromDb = await authorizationActions.GetWorkerByIdAsync(dto.CustomerId);
                    if(workerFromDb==null) return NotFound("Customer not found");
                    else
                    {
                        customerFromDb =await customerActions.Create(new Customer()
                        {
                            Email = workerFromDb.Email,
                            FirstName = workerFromDb.Name,
                            LastName = workerFromDb.Name,
                            Id = workerFromDb.Id,
                            PhoneNum = workerFromDb.Phone
                        });
                    }
                    
                }

                var dishFromDb = await dishActions.GetDishByID(dto.DishId);
                if (dishFromDb == null) return NotFound("Dish not found");

                var newInvitation = new Invitation
                {
                    Customer = customerFromDb,
                    Dish = dishFromDb,
                    Date = dto.Date,
                    CountOfDishes = dto.CountOfDishes,
                    IsUpgradedDish = dto.IsUpgradedDish,
                    NumberOfWaiters=dto.NumberOfWaiters,
                    DishId = dto.DishId,
                    InMorning=dto.InMorning,
                    CustomerId=customerFromDb.Id
    };

                var Invitation = await invitationActions.Create(newInvitation);
                 return Ok(Invitation);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateInvitation([FromBody] Invitation newInvitation)
        {
            if (newInvitation == null)
            {
                return BadRequest("Invalid invitation data.");
            }

            await invitationActions.UpdateInvitationDetails(newInvitation);
            return Ok("Invitation updated successfully.");
        }



        [HttpGet("{monthNum}/{yearNum}")]
        public async Task<ActionResult<List<int>>> GetBusyDates(int monthNum, int yearNum)
        {
            var busyDates = await invitationActions.GetBusyDatesPerMonth(monthNum,yearNum);
            if (busyDates == null || busyDates.Count == 0)
                return new List<int>();

            return busyDates;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {
            await invitationActions.DeleteInvitation(id);
           return Ok();
        }

        [HttpGet("showWeeksOrders")]
        public async Task<List<Invitation>> GetInvitationsForCurrentWeek()
        {
           return await invitationActions.GetInvitationsForCurrentWeek();
        }

        [HttpGet("getDetailsOfDate/{date}")]
        public async Task<IActionResult> GetDetailsOfDate(DateOnly date)
        {
            var details = await invitationActions.GetDetailsAboutDate(date);
            if (details == null )
            {
                return NotFound("No invitations found for the specified date.");
            }
            return Ok(details);
        }
    }
    
}