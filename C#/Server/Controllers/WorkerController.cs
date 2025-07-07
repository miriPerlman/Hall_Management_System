using BL.Api;
using Dal.models;
using BL.Services;
using Microsoft.AspNetCore.Mvc;
using Server.Controllers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController :ControllerBase
    {
        IBLworker workerActions;
        public WorkerController(IBlManager bl)
        {
            workerActions = bl.BlWorker;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkerById(int id)
        {
            var worker = await workerActions.GetWorkerByIdAsync(id);
            return Ok(worker);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllWorkers()
        {
            var allworkers = await workerActions.GetAll(); // הוספת await
            if (allworkers == null || allworkers.Count == 0)
            {
                return NotFound("ERROR!! there are no available customers!!");
            }
            return Ok(allworkers);
        }

        [HttpPost]
        public ActionResult<Worker> CreateNewWorker([FromBody] Worker newWorker)
        {
            workerActions.Create(newWorker);
            return newWorker;
        }
        [HttpGet ("GetWorkerDetails/{id}")]
        public async  Task<ActionResult<Worker>> GetWorkerDetails(int id)
        {
            var workerDetails = workerActions.WorkerDetails(id);
            return await workerDetails;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {
            await workerActions.DeleteWorker(id);
            return Ok();
        }

    }
}

