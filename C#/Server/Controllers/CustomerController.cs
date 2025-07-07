using BL.Api;
//using BL.Models;
using BL.Services;
using Dal.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dal.models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        IBLcustomer  customerActions;
        public CustomersController(IBlManager bl) {
            customerActions = bl.BlCustomer ;
        }

        [HttpPost]
        public ActionResult<Customer> CreateNewCustomer([FromBody] Customer customer)
        {
            customerActions.Create(customer);
            return customer;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var allCustomers = await customerActions.GetAll();
            if (allCustomers == null || allCustomers.Count == 0)
            {
                return NotFound("ERROR!! there are no available customers!!");
            }
            return Ok(allCustomers);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var customer = await customerActions.GetCustomerByIdAsync(id);
            return Ok(customer);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {
            await customerActions.DeleteCustoer(id);
            return Ok();
        }
    }
}
