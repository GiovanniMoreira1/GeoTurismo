using System;
using System.Collections.Generic;
using GeoturismoAPI.Domains;
using Microsoft.EntityFrameworkCore;

namespace GeoturismoAPI.Context;

public partial class GeoturismoContext : DbContext
{
    public GeoturismoContext()
    {
    }

    public GeoturismoContext(DbContextOptions<GeoturismoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<avaliaco> avaliacoes { get; set; }

    public virtual DbSet<categoria> categorias { get; set; }

    public virtual DbSet<evento> eventos { get; set; }

    public virtual DbSet<filtro> filtros { get; set; }

    public virtual DbSet<locai> locais { get; set; }

    public virtual DbSet<locaisoficiai> locaisoficiais { get; set; }

    public virtual DbSet<prefeitura> prefeituras { get; set; }

    public virtual DbSet<usuario> usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=geoturismo;Username=geoturismo;Password=geopass;Include Error Detail=true", x => x.UseNetTopologySuite());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("pgcrypto")
            .HasPostgresExtension("postgis");

        modelBuilder.Entity<avaliaco>(entity =>
        {
            entity.HasKey(e => e.id_avaliacoes).HasName("avaliacoes_pkey");

            entity.HasIndex(e => e.locais_id, "idx_avaliacoes_locais_id");

            entity.HasIndex(e => e.usuarios_id, "idx_avaliacoes_usuarios_id");

            entity.Property(e => e.id_avaliacoes).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.data_avaliacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone");

            entity.HasOne(d => d.locais).WithMany(p => p.avaliacos)
                .HasForeignKey(d => d.locais_id)
                .HasConstraintName("fk_local");

            entity.HasOne(d => d.usuarios).WithMany(p => p.avaliacos)
                .HasForeignKey(d => d.usuarios_id)
                .HasConstraintName("fk_usuario");
        });

        modelBuilder.Entity<categoria>(entity =>
        {
            entity.HasKey(e => e.id_categorias).HasName("categorias_pkey");

            entity.HasIndex(e => e.nome, "categorias_nome_key").IsUnique();

            entity.Property(e => e.id_categorias).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.nome).HasMaxLength(100);
        });

        modelBuilder.Entity<evento>(entity =>
        {
            entity.HasKey(e => e.id_eventos).HasName("eventos_pkey");

            entity.Property(e => e.id_eventos).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.data_fim).HasColumnType("timestamp without time zone");
            entity.Property(e => e.data_inicio).HasColumnType("timestamp without time zone");
            entity.Property(e => e.nome_evento).HasMaxLength(100);
        });

        modelBuilder.Entity<filtro>(entity =>
        {
            entity.HasKey(e => e.id_filtros).HasName("filtros_pkey");

            entity.HasIndex(e => e.categorias_id, "idx_filtros_categorias_id");

            entity.HasIndex(e => e.locais_id, "idx_filtros_locais_id");

            entity.Property(e => e.id_filtros).HasDefaultValueSql("gen_random_uuid()");

            entity.HasOne(d => d.categorias).WithMany(p => p.filtros)
                .HasForeignKey(d => d.categorias_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_categoria");

            entity.HasOne(d => d.locais).WithMany(p => p.filtros)
                .HasForeignKey(d => d.locais_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_local");
        });

        modelBuilder.Entity<locai>(entity =>
        {
            entity.HasKey(e => e.id_locais).HasName("locais_pkey");

            entity.HasIndex(e => e.localizacao, "idx_locais_localizacao").HasMethod("gist");

            entity.Property(e => e.id_locais).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.localizacao).HasColumnType("geography(Point,4326)");
            entity.Property(e => e.media_avaliacao).HasDefaultValueSql("0");
            entity.Property(e => e.nome).HasMaxLength(100);

            entity.HasOne(d => d.usuarios).WithMany(p => p.locais)
                .HasForeignKey(d => d.usuarios_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_usuario");
        });

        modelBuilder.Entity<locaisoficiai>(entity =>
        {
            entity.HasKey(e => e.id_locais_oficiais).HasName("locaisoficiais_pkey");

            entity.Property(e => e.id_locais_oficiais).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.data_oficializacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone");
            entity.Property(e => e.oficializado).HasDefaultValue(false);

            entity.HasOne(d => d.locais).WithMany(p => p.locaisoficiais)
                .HasForeignKey(d => d.locais_id)
                .HasConstraintName("fk_local");

            entity.HasOne(d => d.prefeitura).WithMany(p => p.locaisoficiais)
                .HasForeignKey(d => d.prefeitura_id)
                .HasConstraintName("fk_prefeitura");
        });

        modelBuilder.Entity<prefeitura>(entity =>
        {
            entity.HasKey(e => e.id_prefeituras).HasName("prefeituras_pkey");

            entity.Property(e => e.id_prefeituras).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.orgao).HasMaxLength(40);
            entity.Property(e => e.responsavel).HasMaxLength(100);

            entity.HasOne(d => d.usuarios).WithMany(p => p.prefeituras)
                .HasForeignKey(d => d.usuarios_id)
                .HasConstraintName("fk_usuario");
        });

        modelBuilder.Entity<usuario>(entity =>
        {
            entity.HasKey(e => e.id_usuarios).HasName("usuarios_pkey");

            entity.HasIndex(e => e.email, "idx_usuarios_email");

            entity.HasIndex(e => e.email, "usuarios_email_key").IsUnique();

            entity.Property(e => e.id_usuarios).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.email).HasMaxLength(200);
            entity.Property(e => e.nome).HasMaxLength(100);
            entity.Property(e => e.senha).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
