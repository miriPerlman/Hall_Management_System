using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class LastDish
{
    public int Id { get; set; }

    public bool FruitSmoothie { get; set; }

    public bool IceCream { get; set; }

    public bool Soflle { get; set; }

    public bool Pralines { get; set; }

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
