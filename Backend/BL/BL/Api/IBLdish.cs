using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLdish
    {
        public Task<Dish> GetDishByID(int id);
        public Task<Dish> Create(Dish dish);
        public Task<FirstDish> CreateFirstDish(FirstDish dish);
        public Task<LastDish> CreateLastDish(LastDish dish);
        public Task<MainDish> CreateMainDish(MainDish dish);
        public Task<Salad> CreateSalad(Salad dish);
        public Task<FirstDish> getOrCreateFirstDishDetails();
        public Task<LastDish> getOrCreateLastDishDetails();
        public Task<MainDish> getOrCreateMainDishDetails();
        public Task<Salad> getOrCreateSaladDetails();

    }
}
