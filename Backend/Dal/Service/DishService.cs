using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Service
{
    public class DishService : IDish
    {
        DatabaseManager db;
        public DishService(DatabaseManager db)
        {
            this.db = db;
        }
        public async Task<Dish> Create(Dish dish)
        {
            await db.Dishes.AddAsync(dish);
            await db.SaveChangesAsync();
            return dish;

        }

        public Task Delete(Dish item)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Dish>> Read()
        {
            return await db.Dishes.ToListAsync();
        }

        public Task UpDate(Dish item)
        {
            throw new NotImplementedException();
        }
    }
}
