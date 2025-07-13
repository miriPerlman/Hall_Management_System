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
    public class FirstDishService : IFirstDish
    {
        private readonly DatabaseManager db;

        public FirstDishService(DatabaseManager db)
        {
            this.db = db;
        }

        // Fix for CS0535: Implement 'ICrud<FirstDish>.Create(FirstDish)'
        public async Task Create(FirstDish entity)
        {
            await db.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        // Fix for CS0738: Implement 'ICrud<FirstDish>.Read()' with correct return type
        public Task<List<FirstDish>> Read()
        {
            return db.FirstDishes.ToListAsync();
        }

        // Fix for CS0535: Implement 'ICrud<FirstDish>.Delete(FirstDish)'
        public async Task Delete(FirstDish item)
        {
            var existingDish = await db.FirstDishes.FindAsync(item.Id);
            if (existingDish == null)
            {
                throw new Exception($"FirstDish with ID {item.Id} not found.");
            }
            db.FirstDishes.Remove(existingDish);
            await db.SaveChangesAsync();
        }

        // Fix for CS0535: Implement 'ICrud<FirstDish>.UpDate(FirstDish)'
        public async Task UpDate(FirstDish item)
        {
            var existingDish = await db.FirstDishes.FindAsync(item.Id);

            if (existingDish != null)
            {
                existingDish.GrilledFish = item.GrilledFish;
                existingDish.SalmonFish = item.SalmonFish;
                existingDish.PotatoBourekas = item.PotatoBourekas;
                existingDish.Blintze = item.Blintze;

                await db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Error!! FirstDish not found!!");
            }
        }
    }
}
