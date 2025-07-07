using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BL.Api;
using BL.Services;
using Dal;
using Dal.Api;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class BlManager : IBlManager
    {
        // מיצגת את השכבה
        public IBLcustomer? BlCustomer { get; }
        public IBLInvitation? BlInvitation { get; }
        public IBLworker? BlWorker { get; }
        public IBLauthorization? BlAuthorization { get; }
        public IBLdish? Bldish {  get; }


        public BlManager()
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<IDal, DalManager>();
            services.AddSingleton<IBLcustomer, BLCustomerService>();
            services.AddSingleton<IBLInvitation, BLInvitationService>();
            services.AddSingleton<IBLworker, BLWorkerService>();
            services.AddSingleton<IBLauthorization, BLAuthorizationService>();
            services.AddSingleton<IBLdish, BLDishService>();
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            BlCustomer = serviceProvider.GetService<IBLcustomer>();
            BlInvitation=serviceProvider.GetService<IBLInvitation>();
            BlWorker = serviceProvider.GetService<IBLworker>();
            BlAuthorization=serviceProvider.GetService<IBLauthorization>();
            Bldish = serviceProvider.GetService<IBLdish>();
        }
    }
}