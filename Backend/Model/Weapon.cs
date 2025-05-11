using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.Model
{
    public class Weapon
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo {name} é obrigatório.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "O campo {description} é obrigatório.")]
        public string? Description { get; set; }
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {attack} é obrigatório.")]
        public string AttackStr { get; set; } = "[]";
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {Guard} é obrigatório.")]
        public string GuardStr { get; set; } = "[]";
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {scaling} é obrigatório.")]
        public string ScallingStr { get; set; } = "[]";
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {requires} é obrigatório.")]
        public string RequiresStr { get; set; } = "[]";
        [Required(ErrorMessage = "O campo {type} é obrigatório.")]
        public string? Type { get; set; }
        [JsonIgnore]
        [Required(ErrorMessage = "O campo {damageType} é obrigatório.")]
        public string DamageTypeStr { get; set; } = "[]";
        [Required(ErrorMessage = "O campo {skill} é obrigatório.")]
        public string? Skill { get; set; }
        [Required(ErrorMessage = "O campo {fpCost} é obrigatório.")]
        public string? FpCost { get; set; }
        [Required(ErrorMessage = "O campo {weight} é obrigatório.")]
        public float Weight { get; set; }
        [JsonIgnore]
        public string InflictsStr { get; set; } = "[]";
        public bool Active {get; set;}

        [NotMapped]
        public List<string> Attack
        {
            get => JsonSerializer.Deserialize<List<string>>(AttackStr) ?? new List<string>();
            set => AttackStr = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Guard
        {
            get => JsonSerializer.Deserialize<List<string>>(GuardStr) ?? new List<string>();
            set => GuardStr = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Scalling
        {
            get => JsonSerializer.Deserialize<List<string>>(ScallingStr) ?? new List<string>();
            set => ScallingStr = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Requires
        {
            get => JsonSerializer.Deserialize<List<string>>(RequiresStr) ?? new List<string>();
            set => RequiresStr = JsonSerializer.Serialize(value);
        }

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
    }
}