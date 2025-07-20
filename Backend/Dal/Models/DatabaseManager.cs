using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class DatabaseManager : DbContext
{
    public DatabaseManager()
    {
    }

    public DatabaseManager(DbContextOptions<DatabaseManager> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Dish> Dishes { get; set; }

    public virtual DbSet<FirstCourse> FirstCourses { get; set; }

    public virtual DbSet<FirstDish> FirstDishes { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<LastDish> LastDishes { get; set; }

    public virtual DbSet<MainDish> MainDishes { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<Salad> Salads { get; set; }

    public virtual DbSet<Worker> Workers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Hall-Management-System\\Backend\\Dal\\database\\Halldb.mdf;Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC0732B98CB9");

            entity.ToTable("Customer");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.FirstName)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .IsFixedLength();
            entity.Property(e => e.PhoneNum)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Dish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Dishes__3214EC07A2EDAB06");

            entity.Property(e => e.FirstDishId).HasColumnName("First_DishId");
            entity.Property(e => e.LastDishId).HasColumnName("Last_DishId");
            entity.Property(e => e.MainDishId).HasColumnName("Main_DishId");

            entity.HasOne(d => d.FirstDish).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.FirstDishId)
                .HasConstraintName("FK_Dishes_ToFirst_Dish");

            entity.HasOne(d => d.LastDish).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.LastDishId)
                .HasConstraintName("FK_Dishes_Tolast_Dish");

            entity.HasOne(d => d.MainDish).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.MainDishId)
                .HasConstraintName("FK_Dishes_Tomain_dish");

            entity.HasOne(d => d.Salads).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.SaladsId)
                .HasConstraintName("FK_Dishes_ToSalads");
        });

        modelBuilder.Entity<FirstCourse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__first_co__3214EC07B7A3A1CA");

            entity.ToTable("first_course");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<FirstDish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC0726715981");

            entity.ToTable("first_Dish");

            entity.Property(e => e.Blintze).HasColumnName("blintze");
            entity.Property(e => e.GrilledFish).HasColumnName("Grilled_fish");
            entity.Property(e => e.PotatoBourekas).HasColumnName("potato_Bourekas");
            entity.Property(e => e.SalmonFish).HasColumnName("Salmon_fish");
        });

        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC072C1FDC76");

            entity.ToTable("Invitation");

            entity.Property(e => e.InMorning).HasColumnName("inMorning");

            entity.HasOne(d => d.Customer).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Invitation_ToCustomer");

            entity.HasOne(d => d.Dish).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.DishId)
                .HasConstraintName("FK_Invitation_ToDish");
        });

        modelBuilder.Entity<LastDish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07B9802BA5");

            entity.ToTable("last_dish");

            entity.Property(e => e.FruitSmoothie).HasColumnName("Fruit_smoothie");
            entity.Property(e => e.IceCream).HasColumnName("Ice_cream");
        });

        modelBuilder.Entity<MainDish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC0719A1B243");

            entity.ToTable("main_dish");

            entity.Property(e => e.ChickenBreast).HasColumnName("Chicken_Breast");
            entity.Property(e => e.ChickenHomeFries).HasColumnName("Chicken_Home_Fries");
            entity.Property(e => e.EntrecoteSteak).HasColumnName("Entrecote_Steak");
            entity.Property(e => e.VegetableStuffedTortilla).HasColumnName("Vegetable_stuffed_tortilla");
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07EFD41596");

            entity.ToTable("Menu");

            entity.Property(e => e.TypeOfDish)
                .HasMaxLength(20)
                .IsFixedLength();
        });

        modelBuilder.Entity<Salad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC076D2BC3CB");

            entity.Property(e => e.ConfitedGarlic).HasColumnName("Confited_Garlic");
            entity.Property(e => e.SpicyEggplant).HasColumnName("Spicy_Eggplant");
            entity.Property(e => e.SweetPotatoes).HasColumnName("Sweet_Potatoes");
        });

        modelBuilder.Entity<Worker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Worker__3214EC07C0EBE5E7");

            entity.ToTable("Worker");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Bonus)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.WorkerType).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
