using BL.Api;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        IBLInvitation invitationActions;
        public InvitationsController(IBlManager bl)
        {
            invitationActions = bl.BlInvitation;
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


        [HttpPost]
        public ActionResult<Invitation> CreateNewInvitation([FromBody] Invitation invitation)
        {
            {
                invitationActions.Create(invitation);
                return invitation;
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