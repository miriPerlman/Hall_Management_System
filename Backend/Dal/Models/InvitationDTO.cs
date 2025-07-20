using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Models
{
    public class InvitationDTO
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public DateOnly Date { get; set; }

        public int CountOfDishes { get; set; }

        public bool IsUpgradedDish { get; set; }

        public int NumberOfWaiters { get; set; }

        public int DishId { get; set; }

        public bool InMorning { get; set; }
    }
}
