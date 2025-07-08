using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Service
{
    public class CustomerService : ICustomer
    {
        DatabaseManager db;
        public CustomerService(DatabaseManager db)
        {
            this.db = db;
        }
        public async Task Create(Customer customer)
        {
          
           await db.AddAsync(customer);
           await db.SaveChangesAsync();
        }

        public async Task Delete(Customer item)
        {
            var existingCustomer = await db.Customers.FindAsync(item.Id);
            if (existingCustomer == null)
            {
                throw new Exception($"Invitation with ID {item.Id} not found.");
            }
            var invitations = await db.Invitations.Where(inv => inv.CustomerId== existingCustomer.Id).ToListAsync();
            if (invitations.Any())
            {
                db.Invitations.RemoveRange(invitations);
            }
            db.Customers.Remove(existingCustomer);
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
        public async Task<List<Customer>> Read()
        {
            return await db.Customers.ToListAsync();
        }


        public Task UpDate(Customer item)
        {
            throw new NotImplementedException();
        }


    }
}
