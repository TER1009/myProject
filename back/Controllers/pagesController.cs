using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using back.services;
using back.DTO;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IO;


namespace back.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class pages : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly userService _service;
        private contentPagesDTOService dto = new contentPagesDTOService();
        private userDTOService userDto = new userDTOService();
        public pages(IConfiguration configuration, userService service)
        {
            _configuration = configuration;
            _service = service;
        }

        [HttpPost(nameof(postPage))]
        public async Task<IActionResult> postPage([FromForm] contentPageView pageContent)
        {
            var cookie = Request.Cookies["id"];
            var refresh = Request.Cookies["refresh"];
            var page = new contentPagesDTO()
            {
                typeContent = pageContent.typeContent,
                description = pageContent.description,
            };
            if (pageContent.files.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    pageContent.files.CopyTo(ms);
                    page.files = ms.ToArray();
                }
            }
            if (pagesValidService.check(page))
            {
                var list = dto.getAll();
                if (list == null) page.id = Guid.NewGuid();
                else page.id = Guid.NewGuid();
                if (cookie == null)
                {
                    var Jwt = new JwtSecurityTokenHandler();
                    Console.WriteLine("HERE " + refresh);
                    var data = Jwt.ReadJwtToken(refresh).Claims.First(claim => claim.Type == "email");
                    var user = userDto.getByEmailReturnPersonalDataClientDto(data.Value);
                    page.ownerClientId = user.id;
                    page.lastEditor = user.id;
                }
                else
                {
                    var Jwt = new JwtSecurityTokenHandler();
                    var data = Jwt.ReadJwtToken(cookie).Claims.First(claim => claim.Type == "id");
                    var user = userDto.getByIDPersonalDataDTO(new Guid(data.Value));
                    page.ownerClientId = user.id;
                    page.lastEditor = user.id;
                }
                dto.create(page);
                return Ok("true");
            }
            else return BadRequest("Не все поля заполнены");
        }

        [HttpGet(nameof(getCharacters))]
        public async Task<IActionResult> getCharacters()
        {
            Console.WriteLine(dto.getAll()[0]);
            return Ok(dto.getAll());
        }
    }
}