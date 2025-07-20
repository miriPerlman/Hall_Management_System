using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLInvitation
    {
        public Task<List<int>> GetBusyDatesPerMonth(int month, int year);
        public Task DeleteInvitation(int id);
        public Task<Invitation> Create(Invitation customer);
        public Task<List<Invitation>> GetAll();
        public Task UpdateInvitationDetails(Invitation invitation);
        public Task<List<Invitation>> GetInvitationsForCurrentWeek();
        public Task<object> GetDetailsAboutDate(DateOnly date);
        public Task<List<Invitation>> GetByCustomerId(int customerId);
    }
}
