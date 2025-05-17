using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Model;
using Backend.Data;

namespace Backend.Controller
{
    [ApiController]
    [Route("weapon")]
    public class WeaponController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public WeaponController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

    [HttpPost]
    public async Task<IActionResult> AddWeapon([FromBody] Weapon weapon)
    {
        if (weapon == null)
        {
            return BadRequest("Arma inválida");
        }

        try 
        {
            await _appDbContext.tb_weapons.AddAsync(weapon);
            await _appDbContext.SaveChangesAsync();
            return Created("Arma criada com sucesso", weapon);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Weapon>>> GetWeapons()
    {
        try
        {
            var weapons = await _appDbContext.tb_weapons.ToListAsync();
            if (weapons == null || !weapons.Any())
            {
                return NotFound("Nenhuma arma encontrada");
            }
            return Ok(weapons);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Weapon>> GetWeaponById(int id)
    {
        try
        {
            var weapon = await _appDbContext.tb_weapons.FindAsync(id);
            if (weapon == null)
            {
                return NotFound("Arma não encontrada");
            }
            return Ok(weapon);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

[HttpGet("type/{type}")]
public async Task<ActionResult<IEnumerable<Weapon>>> GetWeaponsByType(string type)
{
    try
    {
        var weapons = await _appDbContext.tb_weapons
            .Where(w => w.Type.ToLower() == type.ToLower())
            .ToListAsync();

        if (weapons == null || !weapons.Any())
        {
            return NotFound("Nenhuma arma encontrada para o tipo especificado");
        }

        return Ok(weapons);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWeapon(int id, [FromBody] Weapon weapon)
    {
        if (id != weapon.Id)
        {
            return BadRequest("ID da arma não corresponde");
        }
        try
        {
            _appDbContext.tb_weapons.Update(weapon);
            await _appDbContext.SaveChangesAsync();
            return Ok("Arma atualizada com sucesso");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWeapon(int id)
    {
        try
        {
            var weapon = await _appDbContext.tb_weapons.FindAsync(id);
            if (weapon == null)
            {
                return NotFound("Arma não encontrada");
            }
            _appDbContext.tb_weapons.Remove(weapon);
            await _appDbContext.SaveChangesAsync();
            return Ok("Arma deletada com sucesso");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }
}
}