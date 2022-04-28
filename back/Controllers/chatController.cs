using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using back.DTO;
using back.services;
using System.Text.Json;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Linq;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class chat : ControllerBase
    {
        roomDTOService service = new roomDTOService();
        userDTOService userService = new userDTOService();

        [HttpPost(nameof(roomCreate))]
        public async Task<IActionResult> roomCreate([FromBody] roomView room)
        {
            try
            {
                var id = "";
                var cookie = Request.Cookies["id"];
                var refresh = Request.Cookies["refresh"];
                var jwt = new JwtSecurityTokenHandler();
                var resu = cookie.GetType().ToString();
                Console.WriteLine("cookie " + cookie + " refresh " + refresh);
                if (cookie != null)
                {
                    id = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "id").Value;
                }
                else
                {
                    var email = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "email").Value;
                    id = userService.getByEmailReturnPersonalDataClientDto(email).id.ToString();
                }
                if (cookie != null || refresh != null)
                {
                    var roomNew = new roomDTO()
                    {
                        id = Guid.NewGuid(),
                        ownerUserid = new Guid(id),
                        topic = room.topic,
                        owner = userService.getByID(new Guid(id)).nickname,
                    };
                    service.create(roomNew);
                    return Ok(roomNew);
                }
                else return BadRequest("false");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(nameof(roomsGet))]
        public async Task<IActionResult> roomsGet()
        {

            try
            {
                var rooms = service.getAll();
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(nameof(myRoomsGet))]
        public async Task<IActionResult> myRoomsGet()
        {

            return Ok();
        }
    }
}