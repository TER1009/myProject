using System.Net.Http.Headers;
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
        roomDTOService roomService = new roomDTOService();
        userDTOService userService = new userDTOService();
        chatServise chatServise = new chatServise();
        chatMessagesService chatMessagesService = new chatMessagesService();
        messageServise messageServise = new messageServise();

        [HttpPost(nameof(roomCreate))]
        public async Task<IActionResult> roomCreate([FromBody] roomView room)
        {
            try
            {
                var id = "";
                var cookie = Request.Cookies["id"];
                var jwt = new JwtSecurityTokenHandler();
                id = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "id").Value;
                if (cookie != null)
                {
                    var roomNew = new roomDTO()
                    {
                        id = Guid.NewGuid(),
                        ownerId = new Guid(id),
                        topic = room.topic,
                        owner = userService.getByID(new Guid(id)).nickname,
                    };
                    var newChat = new chatDTO()
                    {
                        chatId = Guid.NewGuid(),
                        roomId = roomNew.id,
                    };
                    roomService.create(roomNew);
                    chatServise.create(newChat);
                    return Ok(roomNew);
                }
                else return BadRequest("false");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex);
            }
        }

        [HttpGet(nameof(roomsGet))]
        public async Task<IActionResult> roomsGet()
        {

            try
            {
                var rooms = roomService.getAll();
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

        [HttpPost(nameof(getMessages))]
        public async Task<IActionResult> getMessages([FromBody] roomId room)
        {
            var chatId = chatServise.getByRoomId(new Guid(room.id)).chatId;
            var messagesId = chatMessagesService.getMessagesId(chatId);
            var messages = new List<messageDTO>();
            Console.WriteLine("message! " + messagesId.Count);
            for (var i = 0; i < messagesId.Count; i++)
            {
                Console.WriteLine(@$"message! {i} " + messagesId[i].messageId);
                messages.Add(messageServise.getById(messagesId[i].messageId));
            }
            return Ok(messages);
        }

        [HttpPost(nameof(postMessage))]
        public async Task<IActionResult> postMessage([FromBody] messageDTO message)
        {
            var cookie = Request.Cookies["id"];
            var id = "";
            if (cookie != null)
            {
                var jwt = new JwtSecurityTokenHandler();
                id = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "id").Value;
                userService.getByID(new Guid(id));
            }
            var chat = chatServise.getByRoomId(new Guid(message.roomId));
            message.id = Guid.NewGuid();
            message.ownerId = id;
            message.name = userService.getByID(new Guid(id)).nickname;

            chatMessagesService.create(new chatMessagesDTO()
            {
                messageId = message.id,
                chatId = chat.chatId,
            });
            messageServise.create(message);
            return Ok();
        }
    }
}