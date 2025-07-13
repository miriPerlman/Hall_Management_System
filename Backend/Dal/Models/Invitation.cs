using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Invitation
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public DateOnly Date { get; set; }

    public int CountOfDishes { get; set; }

    public bool IsUpgradedDish { get; set; }

    public int NumberOfWaiters { get; set; }

    public int? DishId { get; set; }

    public bool? InMorning { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Dish? Dish { get; set; }
}
