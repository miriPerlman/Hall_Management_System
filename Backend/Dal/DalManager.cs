using Dal.Api;
using Dal.Models;
using Dal.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{
    public class DalManager : IDal
    {
        public ICustomer? customers { get; set; }
        public IInvitation? invitations { get; set; }
        public IWorker? workers { get; set; }
        public IDish? dish { get; set; }
        public IFirstDish? firstDish { get; set; }
        public ILastDish? lastDish { get; set; }
        public IMainDish? mainDish { get; set; }
        public ISalad? salad { get; set; }

        public DalManager()
        {
            ServiceCollection service = new ServiceCollection();
            service.AddSingleton<DatabaseManager>(); 
            service.AddSingleton<ICustomer,CustomerService>();
            service.AddSingleton<IInvitation, InvitationService>();
            service.AddSingleton<IWorker, WorkerService>();
            service.AddSingleton<IDish, DishService>();
            service.AddSingleton<ISalad, SaladService>();
            service.AddSingleton<IFirstDish, FirstDishService>();
            service.AddSingleton<IMainDish, MainDishService>();
            service.AddSingleton<ILastDish, LastDishService>();
            ServiceProvider serviceProvider = service.BuildServiceProvider();
            customers = serviceProvider.GetService<ICustomer>();
            invitations = serviceProvider.GetService<IInvitation>();
            workers = serviceProvider.GetService<IWorker>();
            dish = serviceProvider.GetService<IDish>();
            firstDish = serviceProvider.GetService<IFirstDish>();
            lastDish = serviceProvider.GetService<ILastDish>();
            mainDish = serviceProvider.GetService<IMainDish>();
            salad = serviceProvider.GetService<ISalad>();
        }
    }
}
