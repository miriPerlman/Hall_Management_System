using BL.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : Controller
    {
        IBLdish dishActions;
        public DishController(IBlManager bl)
        {
            dishActions = bl.Bldish;
        }

        [HttpPost("createNewDish")]
        public async Task<ActionResult<Dish>> CreateNewDish([FromBody] Dish newDish)
        {
            var dish = await dishActions.Create(newDish);
            return Ok(dish);
        }

        [HttpPost("createNewFirstDish")]
        public async Task<ActionResult<FirstDish>> CreateNewFirstDish([FromBody] FirstDish newDish)
        {
            var dish = await dishActions.CreateFirstDish(newDish);
            return Ok(dish);
        }

        [HttpPost("createNewLastDish")]
        public async Task<ActionResult<LastDish>> CreateNewLastDish([FromBody] LastDish newDish)
        {
            var dish = await dishActions.CreateLastDish(newDish);
            return Ok(dish);
        }

        [HttpPost("createNewMainDish")]
        public async Task<ActionResult<MainDish>> CreateNewMainDish([FromBody] MainDish newDish)
        {
            var dish = await dishActions.CreateMainDish(newDish);
            return Ok(dish);
        }

        [HttpPost("createNewSalad")]
        public async Task<ActionResult<Salad>> CreateNewSalad([FromBody] Salad newDish)
        {
            var dish = await dishActions.CreateSalad(newDish);
            return Ok(dish);
        }
        [HttpGet("getFirstDishDetails")]
        public async Task<ActionResult<FirstDish>> GetFirstDish()
        {
            var dish = await dishActions.getOrCreateFirstDishDetails();
            return Ok(dish);
        }
        [HttpGet("getLastDishDetails")]
        public async Task<ActionResult<LastDish>> GetLastDish()
        {
            var dish = await dishActions.getOrCreateLastDishDetails();
            return Ok(dish);
        }
        [HttpGet("getMainDishDetails")]
        public async Task<ActionResult<MainDish>> GetMaintDish()
        {
            var dish = await dishActions.getOrCreateMainDishDetails();
            return Ok(dish);
        }
        [HttpGet("getSaladDetails")]
        public async Task<ActionResult<Salad>> GetSalad()
        {
            var dish = await dishActions.getOrCreateSaladDetails();
            return Ok(dish);
        }

    }
}