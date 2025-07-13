using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Worker
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Age { get; set; }

    public string WorkerType { get; set; } = null!;

    public double Salary { get; set; }

    public double HoursAtWeek { get; set; }

    public string? Bonus { get; set; }

    public int? Seniority { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }
}
