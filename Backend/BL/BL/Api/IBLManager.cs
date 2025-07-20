using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBlManager
    {
        public IBLcustomer BlCustomer { get; }
        public IBLInvitation BlInvitation { get; }
        public IBLworker BlWorker { get; }
        public IBLdish Bldish { get; }
        public IBLauthorization BlAuthorization { get; }
    }
}
