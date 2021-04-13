package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.Message;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

public class MessageRepositoryMock implements MessageRepository {
    List<Message> messages = List.of(
            new Message(UUID.fromString("bf29b945-1a31-4ea6-a608-24118605522d"), "Hallol Leut", 12L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss"),
            new Message(UUID.fromString("70bf827e-a8a8-4257-abc7-d1a192bc7993"), "Wie geht es euch?", 24L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss"),
            new Message(UUID.fromString("ca32cb71-6ae0-4c1d-9cfb-ec5c1942e8c1"), "Mir geht es super", 26L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss"),
            new Message(UUID.fromString("8206de92-3092-48ae-ba2c-2464fcce52a9"), "Ich habe gerade eine Zwischentabelle erstellt", 12L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss"),
            new Message(UUID.fromString("14e6031c-8dd1-40c2-aa45-1a812d807a37"), "Hallol Leut", 35L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss"),
            new Message(UUID.fromString("5b09c5c8-919c-4ed2-ba4f-074b1b28609f"), "Hallol Leut", 55L, UUID.fromString("e9615009-d873-4b0a-a9a1-d0d751cab2ed"), "Hugo Boss")
    );

    @Override
    public List<Message> getNewMessage(long lastTimeChecked) {
        return messages.stream().filter(m -> m.getSentOn() > lastTimeChecked).collect(Collectors.toList());
    }

    @Override
    public List<Message> getOldMessage(long timeStamp) {
        return messages.stream().filter(m -> m.getSentOn() < timeStamp).collect(Collectors.toList());
    }

    @Override
    public long getNewestMessageFromUser(UUID id, long currentTime) {
        return 0;
    }

    @Override
    public List<Message> findAll() {
        return messages;
    }

    @Override
    public List<Message> findAll(Sort sort) {
        return messages;
    }

    @Override
    public Page<Message> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<Message> findAllById(Iterable<UUID> uuids) {
        return null;
    }

    @Override
    public long count() {
        return messages.size();
    }

    @Override
    public void deleteById(UUID uuid) {

    }

    @Override
    public void delete(Message entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends Message> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends Message> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Message> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Message> findById(UUID uuid) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(UUID uuid) {
        return false;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Message> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public void deleteInBatch(Iterable<Message> entities) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Message getOne(UUID uuid) {
        return null;
    }

    @Override
    public <S extends Message> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Message> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Message> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Message> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Message> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Message> boolean exists(Example<S> example) {
        return false;
    }
}
