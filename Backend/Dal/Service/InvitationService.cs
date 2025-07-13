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
    public class InvitationService : IInvitation
    {
        DatabaseManager db;
        public InvitationService(DatabaseManager db)
        {
            this.db = db;
        }
        public async Task Create(Invitation item)
        {
            await db.Invitations.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public async Task Delete(Invitation item)
        {
            var existingInvitation = await db.Invitations.FindAsync(item.Id);
            if (existingInvitation == null)
            {
                throw new Exception($"Invitation with ID {item.Id} not found.");
            }
            db.Invitations.Remove(existingInvitation);
            await db.SaveChangesAsync();
        }


        public Task<List<Invitation>> Read()
        {
            return db.Invitations.ToListAsync();
        }
        public async Task UpDate(Invitation item)
        {
            var existingInvitation = await db.Invitations.FindAsync(item.Id);

            if (existingInvitation != null)
            {
                existingInvitation.CustomerId = item.CustomerId;
                existingInvitation.DishId = item.DishId;
                existingInvitation.Date = item.Date;
                existingInvitation.CountOfDishes = item.CountOfDishes;
                existingInvitation.Dish = item.Dish;
                existingInvitation.Customer = item.Customer;
                existingInvitation.IsUpgradedDish = item.IsUpgradedDish;
                existingInvitation.Customer = item.Customer;
                existingInvitation.NumberOfWaiters = item.NumberOfWaiters;

                await db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Error!! Invitation not found!!");
            }
        }
    }
}
