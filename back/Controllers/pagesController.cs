using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using back.services;
using back.DTO;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Diagnostics.SymbolStore;
using AngleSharp;

namespace back.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class pages : ControllerBase
    {

        //private readonly IConfiguration _configuration;
        private readonly userService _service;
        private contentPagesDTOService dto = new contentPagesDTOService();
        private userDTOService userDto = new userDTOService();
        public pages(userService service)
        {
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
                typePic = pageContent.typePic,
                name = pageContent.name,
            };
            if (pageContent.pic.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    pageContent.pic.CopyTo(ms);
                    page.pic = ms.ToArray();
                    Console.WriteLine(page.pic);
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
                    page.ownerId = user.id;
                    page.lastEditor = user.id;
                }
                else
                {
                    var Jwt = new JwtSecurityTokenHandler();
                    var data = Jwt.ReadJwtToken(cookie).Claims.First(claim => claim.Type == "id");
                    var user = userDto.getByIDPersonalDataDTO(new Guid(data.Value));
                    page.ownerId = user.id;
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
            var list = dto.getAll().Where(x => x.typeContent == "Персонаж");
            return Ok(list.ToArray());
        }

        [HttpGet(nameof(getPlaces))]
        public async Task<IActionResult> getPlaces()
        {
            var list = dto.getAll().Where(x => x.typeContent == "Место");
            return Ok(list.ToArray());
        }

        [HttpGet(nameof(getFruits))]
        public async Task<IActionResult> getFruits()
        {
            var list = dto.getAll().Where(x => x.typeContent == "Фрукт");
            return Ok(list.ToArray());
        }

        [HttpPost(nameof(deletePage))]
        public async Task<IActionResult> deletePage([FromBody] string id)
        {
            // try
            // {

            // }
            // catch (System.Exception ex)
            // {
            //     return BadRequest(ex.Message);
            // }
            dto.deleteById(new Guid(id));
            return Ok();
        }

        [HttpPost(nameof(getVideo))]
        public async Task<IActionResult> getVideo([FromBody] sources index)
        {
            string url = "https://jut.su/oneepiece/episode-1.html";
            var config = Configuration.Default.WithDefaultLoader();
            var context = BrowsingContext.New(config);
            var doc = await context.OpenAsync(url);
            var items = doc.QuerySelector("video").QuerySelectorAll("source");

            object[] sources = new object[4];
            int i = 0;
            foreach (var item in items)
            {
                foreach (var atr in item.Attributes)
                {
                    if (atr.Name == "src") sources[i] = atr.TextContent;
                }
                i++;
            }

            return Ok(sources);
        }
    }
}