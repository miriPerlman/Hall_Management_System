using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public string PhoneNum { get; set; } = null!;

    public string? Email { get; set; }

    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();
}
