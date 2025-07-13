using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
        public ICustomer customers { get; }
        public IInvitation invitations { get; }
        public IWorker workers { get; }
        public IDish dish { get; }
        public IFirstDish firstDish { get; }
        public ILastDish lastDish { get; }
        public IMainDish mainDish { get; }
        public ISalad salad { get; }

    }
}

