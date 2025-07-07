using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Salad
{
    public int Id { get; set; }

    public bool Carrots { get; set; }

    public bool Tomatoes { get; set; }

    public bool ConfitedGarlic { get; set; }

    public bool Eggplant { get; set; }

    public bool SpicyEggplant { get; set; }

    public bool SweetPotatoes { get; set; }

    public bool Cabbage { get; set; }

    public bool Hummus { get; set; }

    public bool Beets { get; set; }

    public bool Khohlrabi { get; set; }

    public bool Lettuce { get; set; }

    public bool Matbuchah { get; set; }

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
