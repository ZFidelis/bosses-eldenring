using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Boss
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo {name} é obrigatório.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "O campo {description} é obrigatório.")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "O campo {health} é obrigatório.")]
        public int Health { get; set; }
        [Required(ErrorMessage = "O campo {defense} é obrigatório.")]
        public int Defense { get; set; }
        [Required(ErrorMessage = "O campo {stance} é obrigatório.")]
        public int Stance { get; set; }
        [Required(ErrorMessage = "O campo {parryable} é obrigatório.")]
        public bool Parryable { get; set; }
        [Required(ErrorMessage = "O campo {damageType} é obrigatório.")]
        public List<string> DamageType { get; set; } = new List<string>();
        public List<string> Inflicts { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {drops} é obrigatório.")]
        public List<string> Drops { get; set; } = new List<string>();
        public bool Active {get; set;}
    }
}