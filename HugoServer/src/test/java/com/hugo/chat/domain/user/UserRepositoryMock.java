package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class UserRepositoryMock implements UserRepository {
    ArrayList<User> db = new ArrayList<>(List.of(new User(UUID.fromString("df03890e-2d28-42b8-b87b-a587ea0f533a"), "Hugo Boss", System.currentTimeMillis()),
            new User(UUID.fromString("ff7a765a-d07b-4221-a086-1574e07bcbc2"), "Timo Nicolas Angst", System.currentTimeMillis()),
            new User(UUID.fromString("8be6e5fd-3629-4035-a1cc-581aacb37155"), "Noel Schiel Gebhardt", System.currentTimeMillis()),
            new User(UUID.fromString("45a2f3f1-85b6-4cf6-bd2b-347d507a4e22"), "dragon99", System.currentTimeMillis())));

    @Override
    public void deleteInactiveUsers(long allowedTime) {

    }

    @Override
    public List<User> findAll() {
        return db;
    }

    @Override
    public List<User> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<User> findAllById(Iterable<UUID> uuids) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(UUID uuid) {

    }

    @Override
    public void delete(User entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends User> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends User> S save(S entity) {
        return null;
    }

    @Override
    public <S extends User> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<User> findById(UUID uuid) {
        return Optional.of(new User(uuid, "Hugo Boss", System.currentTimeMillis()));
    }

    @Override
    public boolean existsById(UUID uuid) {
        return db.stream().anyMatch(user -> user.getId().equals(uuid));
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends User> S saveAndFlush(S entity) {
        entity.setId(UUID.fromString("278a737d-f104-443d-9ba0-5bdfccd44505"));
        return entity;
    }

    @Override
    public void deleteInBatch(Iterable<User> entities) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public User getOne(UUID uuid) {
        return null;
    }

    @Override
    public <S extends User> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends User> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends User> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends User> boolean exists(Example<S> example) {
        return false;
    }
}
