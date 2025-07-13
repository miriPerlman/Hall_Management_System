using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class FirstDish
{
    public int Id { get; set; }

    public bool GrilledFish { get; set; }

    public bool SalmonFish { get; set; }

    public bool PotatoBourekas { get; set; }

    public bool Blintze { get; set; }

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
