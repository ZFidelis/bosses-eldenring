using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

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
        [Required(ErrorMessage = "O campo {location} é obrigatório.")]
        public string? Location { get; set; }
        [Required(ErrorMessage = "O campo {health} é obrigatório.")]
        public int Health { get; set; }
        [Required(ErrorMessage = "O campo {defense} é obrigatório.")]
        public int Defense { get; set; }
        [Required(ErrorMessage = "O campo {stance} é obrigatório.")]
        public int Stance { get; set; }
        [Required(ErrorMessage = "O campo {parryable} é obrigatório.")]
        public bool Parryable { get; set; }
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {damageType} é obrigatório.")]
        public string DamageTypeStr { get; set; } = "[]";
        [JsonIgnore]
        public string InflictsStr { get; set; } = "[]";
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {drops} é obrigatório.")]
        public string DropsStr { get; set; } = "[]";
        public bool Active {get; set;}

        [NotMapped]
        public List<string> DamageType
        {
            get => JsonSerializer.Deserialize<List<string>>(DamageTypeStr) ?? new List<string>();
            set => DamageTypeStr = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Inflicts
        {
            get => JsonSerializer.Deserialize<List<string>>(InflictsStr) ?? new List<string>();
            set => InflictsStr = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Drops
        {
            get => JsonSerializer.Deserialize<List<string>>(DropsStr) ?? new List<string>();
            set => DropsStr = JsonSerializer.Serialize(value);
        }
    }
}