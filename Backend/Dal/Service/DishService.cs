using Dal.Api;
using Dal.models;
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
        public async Task Create(Dish dish)
        {
            await db.AddAsync(dish);
            await db.SaveChangesAsync();


        }

        public Task Delete(Dish item)
        {
            throw new NotImplementedException();
        }

        public Task<List<Dish>> Read()
        {
            throw new NotImplementedException();
        }

        public Task UpDate(Dish item)
        {
            throw new NotImplementedException();
        }
    }
}
