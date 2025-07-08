using BL.Api;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLInvitationService : IBLInvitation

    {
        IInvitation invitation;
        public BLInvitationService(IDal dal)
        {
            invitation = dal.invitations;
        }
        public void Create(Invitation newInvitation)
        {
            invitation.Create(newInvitation);
        }


        public async Task<List<Invitation>> GetAll()
        {
            return await invitation.Read();
        }
        public async Task DeleteInvitation(int id)
        {
            var invitations = await invitation.Read();
            var invitationToDelete = invitations.FirstOrDefault(inv => inv.Id == id);

            if (invitationToDelete != null)
            {
               //var Dish= await invitation.Read();
               //var dishToDelete = Dish.FirstOrDefault(d => d.Id == id);
               // if (dishToDelete != null)
               // {
                   
               // }
               // else
               // {
               //     throw new Exception($"Dish with ID {id} not found.");
               // }
                invitation.Delete(invitationToDelete);
            }
            else
            {
                throw new Exception($"Invitation with ID {id} not found.");
            }
        }

        public async Task<List<int>> GetBusyDatesPerMonth(int month, int year)
        {
            var invitationList = await invitation.Read();
            var busyDates = new List<DateOnly>();

            foreach (var invitation in invitationList)
            {
                if (month == invitation.Date.Month&& year==invitation.Date.Year)
                {
                    busyDates.Add(invitation.Date);
                }
            }
            var busyDays = new List<int>();

            foreach (var date in busyDates)
            {
               
               busyDays.Add(date.Day);
                
            }

            return busyDays;
        }

        public async Task UpdateInvitationDetails(Invitation newInvitation)
        {
            await invitation.UpDate(newInvitation);
        }


        public async Task<List<Invitation>> GetInvitationsForCurrentWeek()
        {

            var startOfWeek = DateTime.Now;
            var endOfWeek = startOfWeek.AddDays(7);
            var invitationList = await invitation.Read();
            return  invitationList
          .Where(inv => inv.Date >= DateOnly.FromDateTime(startOfWeek) && inv.Date < DateOnly.FromDateTime(endOfWeek))
          .ToList();
        }
        public async Task<object> GetDetailsAboutDate(DateOnly date)
        {
            var invitationList = await invitation.Read();
            var invitationsForDate = invitationList.Where(inv => inv.Date == date).ToList();
            return new
            {
                morning = invitationsForDate.Any(inv => inv.InMorning == true),
                evening = invitationsForDate.Any(inv => inv.InMorning == false)
            };
        }
    }
}
