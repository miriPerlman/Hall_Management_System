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
    public class BLDishService : IBLdish
    {
        IDish dishs;
        public BLDishService(IDal dal)
        {
            dishs = dal.dish;
        }
        public void Create(Dish dish)
        {
            dishs.Create(dish);
        }
    }
}
