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
    public class SaladService : ISalad
    {
        DatabaseManager db;
        public SaladService(DatabaseManager db)
        {
            this.db = db;
        }

        public async Task Create(Salad entity)
        {
            await db.Salads.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public Task<List<Salad>> Read()
        {
            return db.Salads.ToListAsync();
        }

        public async Task Delete(Salad item)
        {
            var existingDish = await db.Invitations.FindAsync(item.Id);
            if (existingDish == null)
            {
                throw new Exception($"Salad dish with ID {item.Id} not found.");
            }
            db.Invitations.Remove(existingDish);
            await db.SaveChangesAsync();
        }

        public async Task UpDate(Salad item)
        {
            var existingSalad = await db.Salads.FindAsync(item.Id);

            if (existingSalad != null)
            {
                existingSalad.Carrots = item.Carrots;
                existingSalad.Tomatoes = item.Tomatoes;
                existingSalad.ConfitedGarlic = item.ConfitedGarlic;
                existingSalad.Eggplant = item.Eggplant;
                existingSalad.SpicyEggplant = item.SpicyEggplant;
                existingSalad.SweetPotatoes = item.SweetPotatoes;
                existingSalad.Cabbage = item.Cabbage;
                existingSalad.Hummus = item.Hummus;
                existingSalad.Beets = item.Beets;
                existingSalad.Khohlrabi = item.Khohlrabi;
                existingSalad.Lettuce = item.Lettuce;
                existingSalad.Matbuchah = item.Matbuchah;
              
                await db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Error!! Salad not found!!");
            }
        }
    }
}
