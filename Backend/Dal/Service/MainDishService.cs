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
    public class MainDishService : IMainDish
    {
        private readonly DatabaseManager db;

        public MainDishService(DatabaseManager db)
        {
            this.db = db;
        }
        public async Task Create(MainDish entity)
        {
            await db.MainDishes.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        // Fix for CS0738: Implement 'ICrud<MainDish>.Read()' with correct return type
        public Task<List<MainDish>> Read()
        {
            return db.MainDishes.ToListAsync();
        }

        // Fix for CS0535: Implement 'ICrud<MainDish>.Delete(MainDish)'
        public async Task Delete(MainDish item)
        {
            var existingDish = await db.MainDishes.FindAsync(item.Id);
            if (existingDish == null)
            {
                throw new Exception($"Main dish with ID {item.Id} not found.");
            }
            db.MainDishes.Remove(existingDish);
            await db.SaveChangesAsync();
        }

        // Fix for CS0535: Implement 'ICrud<MainDish>.UpDate(MainDish)'
        public async Task UpDate(MainDish item)
        {
            var existingDish = await db.MainDishes.FindAsync(item.Id);

            if (existingDish != null)
            {
                existingDish.VegetableStuffedTortilla = item.VegetableStuffedTortilla;
                existingDish.Chicken = item.Chicken;
                existingDish.ChickenHomeFries = item.ChickenHomeFries;
                existingDish.Asado = item.Asado;
                existingDish.EntrecoteSteak = item.EntrecoteSteak;
                existingDish.ChickenBreast = item.ChickenBreast;
                existingDish.Schnitzel = item.Schnitzel;

                await db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Error!! Main dish not found!!");
            }
        }
    }
}
