using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Weapons
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo {name} é obrigatório.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "O campo {description} é obrigatório.")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "O campo {attack} é obrigatório.")]
        public List<string> Attack { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {guard} é obrigatório.")]
        public List<string> Guard { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {scaling} é obrigatório.")]
        public List<string> Scaling { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {requires} é obrigatório.")]
        public List<string> Requires { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {type} é obrigatório.")]
        public string? Type { get; set; }
        [Required(ErrorMessage = "O campo {damageType} é obrigatório.")]
        public List<string> DamageType { get; set; } = new List<string>();
        [Required(ErrorMessage = "O campo {skill} é obrigatório.")]
        public string? Skill { get; set; }
        [Required(ErrorMessage = "O campo {fpCost} é obrigatório.")]
        public string? FpCost { get; set; }
        [Required(ErrorMessage = "O campo {weight} é obrigatório.")]
        public float Weight { get; set; }
        [Required(ErrorMessage = "O campo {passive} é obrigatório.")]
        public List<string> Passive { get; set; } = new List<string>();
    }
}