using BL.Api;
//using BL.Models;
using BL.Services;
using Dal.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dal.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationsController : ControllerBase
    {
        IBLauthorization authorizationActions;
        public AuthorizationsController(IBlManager bl)
        {
            authorizationActions = bl.BlAuthorization;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailsById(int id)
        {
            object ReturnObject=null;
            var getWorker=authorizationActions.GetWorkerByIdAsync(id);
            Worker worker = await getWorker;
            if (worker != null)
            {
                ReturnObject = new {id= id, type="worker", workerType= worker.WorkerType, obj= worker };
            }
            else
            {
                var getCustomer = authorizationActions.GetCustomerByIdAsync(id);
                Customer customer = await getCustomer;
                if (customer != null)
                {
                    ReturnObject = new { id = id, type = "customer", obj = customer };
                }
            }
            if(ReturnObject == null)
            {
                throw new Exception("there is no customer and no worker with this id");
            }
            return Ok(ReturnObject);
        }
    }
}