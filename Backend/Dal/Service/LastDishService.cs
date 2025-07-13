using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
namespace Dal.Service

{
    public class LastDishService : ILastDish
    {
        private readonly DatabaseManager db;

        public LastDishService(DatabaseManager db)
        {
            this.db = db;
        }

        public async Task Create(LastDish entity)
        {
            await db.LastDishes.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public Task<List<LastDish>> Read()
        {
            return db.LastDishes.ToListAsync();
        }

        public async Task Delete(LastDish item)
        {
            var existingDish = await db.LastDishes.FindAsync(item.Id);
            if (existingDish == null)
            {
                throw new Exception($"LastDish with ID {item.Id} not found.");
            }
            db.LastDishes.Remove(existingDish);
            await db.SaveChangesAsync();
        }

        public async Task UpDate(LastDish item)
        {
            var existingDish = await db.LastDishes.FindAsync(item.Id);

            if (existingDish != null)
            {
                existingDish.FruitSmoothie = item.FruitSmoothie;
                existingDish.IceCream = item.IceCream;
                existingDish.Soflle = item.Soflle;
                existingDish.Pralines = item.Pralines;

                await db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Error!! LastDish not found!!");
            }
        }
    }
}
