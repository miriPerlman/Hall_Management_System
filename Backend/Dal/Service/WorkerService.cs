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
    public class WorkerService : IWorker
    {
        DatabaseManager db;
        public WorkerService(DatabaseManager db)
        {
            this.db = db;
        }
        public async Task Create(Worker worker)
        {
           await db.AddAsync(worker);
           await db.SaveChangesAsync();
        }

        public async Task Delete(Worker item)
        {
            var existingworker = await db.Workers.FindAsync(item.Id);
            if (existingworker == null)
            {
                throw new Exception($"worker with ID {item.Id} not found.");
            }
            db.Workers.Remove(existingworker);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving changes: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                throw; // חשוב לזרוק את השגיאה כדי לטפל בה ברמה גבוהה יותר
            }

        }


        public async Task<List<Worker>> Read()
        {
            return await db.Workers.ToListAsync();
        }

        public Task UpDate(Worker item)
        {
            throw new NotImplementedException();
        }
    }
}
