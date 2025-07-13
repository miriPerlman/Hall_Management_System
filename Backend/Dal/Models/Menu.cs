using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Menu
{
    public int Id { get; set; }

    public string TypeOfDish { get; set; } = null!;

    public double Price { get; set; }
}
