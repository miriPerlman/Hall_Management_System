using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class MainDish
{
    public int Id { get; set; }

    public bool VegetableStuffedTortilla { get; set; }

    public bool Chicken { get; set; }

    public bool ChickenHomeFries { get; set; }

    public bool Asado { get; set; }

    public bool EntrecoteSteak { get; set; }

    public bool ChickenBreast { get; set; }

    public bool Schnitzel { get; set; }

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
