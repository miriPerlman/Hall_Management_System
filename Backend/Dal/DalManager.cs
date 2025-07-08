using Dal.Api;
using Dal.models;
using Dal.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{
    public class DalManager : IDal
    {
        public ICustomer? customers { get; set; }
        public IInvitation? invitations { get; set; }
        public IWorker? workers { get; set; }
        public IDish? dish { get; }

        public DalManager()
        {
            ServiceCollection service = new ServiceCollection();
            service.AddSingleton<DatabaseManager>(); 
            service.AddSingleton<ICustomer,CustomerService>();
            service.AddSingleton<IInvitation, InvitationService>();
            service.AddSingleton<IWorker, WorkerService>();
            service.AddSingleton<IDish, DishService>();
            ServiceProvider serviceProvider = service.BuildServiceProvider();
            customers = serviceProvider.GetService<ICustomer>();
            invitations = serviceProvider.GetService<IInvitation>();
            workers = serviceProvider.GetService<IWorker>();
            dish = serviceProvider.GetService<IDish>();
        }
    }
}
