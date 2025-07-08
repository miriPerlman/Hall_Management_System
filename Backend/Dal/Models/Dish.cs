using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Dish
{
    public int Id { get; set; }

    public int? SaladsId { get; set; }

    public int? FirstDishId { get; set; }

    public int? MainDishId { get; set; }

    public int? LastDishId { get; set; }

    public virtual FirstDish? FirstDish { get; set; }

    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();

    public virtual LastDish? LastDish { get; set; }

    public virtual MainDish? MainDish { get; set; }

    public virtual Salad? Salads { get; set; }
}
