using BL.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLDishService : IBLdish
    {
        IDish dishes;
        IFirstDish FirstDish;
        ILastDish LastDish;
        IMainDish MainDish;
        ISalad Salad;
        public BLDishService(IDal dal)
        {
            dishes = dal.dish;
            FirstDish=dal.firstDish;
            LastDish=dal.lastDish;
            MainDish=dal.mainDish;
            Salad=dal.salad;
        }
        public async Task<Dish> GetDishByID(int id)
        {
            return (await dishes.Read()).FirstOrDefault(dish=>dish.Id==id);
        }
        public async Task<Dish> Create(Dish dish)
        {
            return await dishes.Create(dish); // Fix: Ensure the Create method is awaited without returning its result.
             // Fix: Return the created dish object explicitly.
        }
        public async Task<FirstDish> CreateFirstDish(FirstDish dish)
        {
            return await FirstDish.Create(dish); 
        }
        public async Task<LastDish> CreateLastDish(LastDish dish){
           return await LastDish.Create(dish);
        
        }
        public async Task<MainDish> CreateMainDish(MainDish dish)
        {
           return await MainDish.Create(dish); // Fix: Ensure the Create method is awaited without returning its result.
           
        }
        public async Task<Salad> CreateSalad(Salad dish)
        {
          return await Salad.Create(dish); // Fix: Ensure the Create method is awaited without returning its result.
          
        }

        public async Task<FirstDish> getOrCreateFirstDishDetails()
        {
            var existingDishes = await FirstDish.Read(); 
            var firstDish = existingDishes.FirstOrDefault(dish =>
                !dish.GrilledFish &&
                !dish.SalmonFish &&
                !dish.PotatoBourekas &&
                !dish.Blintze);

            if (firstDish == null)
            {
                firstDish = new FirstDish()
                {
                    GrilledFish = false,
                    SalmonFish = false,
                    PotatoBourekas = false,
                    Blintze = false
                };

                await FirstDish.Create(firstDish);
            }

            return firstDish;
        }

        public async Task<LastDish> getOrCreateLastDishDetails()
        {
            var existingDishes = await LastDish.Read();
            var lastDish = existingDishes.FirstOrDefault(dish =>
                !dish.Pralines &&
                !dish.IceCream &&
                !dish.FruitSmoothie &&
                !dish.Soflle);

            if (lastDish == null)
            {
                lastDish = new LastDish()
                {
                    Pralines = false,
                    IceCream = false,
                    FruitSmoothie = false,
                    Soflle = false                   
                };

                await LastDish.Create(lastDish);
            }

            return lastDish;
        }
        public async Task<MainDish> getOrCreateMainDishDetails()
        {
            var existingDishes = await MainDish.Read();
            var mainDish = existingDishes.FirstOrDefault(dish =>
                !dish.Asado &&
                !dish.ChickenHomeFries &&
                !dish.Chicken &&
                !dish.ChickenBreast &&
                !dish.EntrecoteSteak &&
                !dish.Schnitzel &&
                !dish.VegetableStuffedTortilla);

            if (mainDish == null)
            {
                mainDish = new MainDish()
                {
                    VegetableStuffedTortilla = false,
                    Schnitzel = false,
                    ChickenHomeFries = false,
                    ChickenBreast = false,
                    Chicken = false,
                    Asado = false,
                    EntrecoteSteak = false
                };

                await MainDish.Create(mainDish);
            }
            return mainDish;
        }
        public async Task<Salad> getOrCreateSaladDetails()
        {
            var existingDishes = await Salad.Read();
            var salad = existingDishes.FirstOrDefault(dish =>
                !dish.Hummus &&
                !dish.Matbuchah &&
                !dish.Lettuce &&
                !dish.SweetPotatoes &&
                !dish.Beets &&
                !dish.Cabbage &&
                !dish.Carrots &&
                !dish.ConfitedGarlic &&
                !dish.Eggplant &&
                !dish.Khohlrabi &&
                !dish.SpicyEggplant &&
                !dish.SweetPotatoes &&
                !dish.Tomatoes);

            if (salad == null)
            {
                salad = new Salad()
                {
                   SweetPotatoes = false,
                   Cabbage = false,
                   Carrots = false,
                   ConfitedGarlic = false,
                   SpicyEggplant = false,
                   Eggplant = false,
                   Hummus = false,
                   Matbuchah = false,
                   Lettuce = false,
                   Beets = false,
                   Khohlrabi = false,
                   Tomatoes = false
                };

                await Salad.Create(salad);
            }

            return salad;
        }
    } }

